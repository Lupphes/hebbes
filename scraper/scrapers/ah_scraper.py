import json
import os
import re
import time
from bs4 import BeautifulSoup
import requests
from .base_scraper import BaseScraper
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor


class AHScraper(BaseScraper):
    SHORT_NAME = "ah"
    LONG_NAME = "Alber Heijn"
    BASE_URL = "https://www.ah.nl/"
    CATEGORIES_SITEMAP_URL = BASE_URL + "sitemaps/entities/products/categories.xml"
    PRODUCTS_SITEMAP_URL = BASE_URL + "sitemaps/entities/products/detail.xml"
    HEADERS = {
        "Host": "api.ah.nl",
        "x-dynatrace": "MT_3_4_772337796_1_fae7f753-3422-4a18-83c1-b8e8d21caace_0_1589_109",
        "x-application": "AHWEBSHOP",
        "User-Agent": "LuppieApp/1.1.28 Android/14.0 Mobile",
        "Content-Type": "application/json; charset=UTF-8",
    }
    SCRAPE_CATEGORIES = False
    SCRAPE_PRODUCTS = False

    def __init__(self):
        self.access_token = self._get_anonymous_access_token()
        super().__init__(
            self.BASE_URL,
            self.CATEGORIES_SITEMAP_URL,
            self.PRODUCTS_SITEMAP_URL,
        )

    def _make_request(self, url, params=None, retries=3, delay=None):
        """A generic function to make a GET request with the common headers and authorization token."""
        delay = delay or 1

        for i in range(retries):
            response = requests.get(
                url,
                headers={
                    **self.HEADERS,
                    "Authorization": "Bearer {}".format(
                        self.access_token.get("access_token")
                    ),
                },
                params=params,
            )

            if response.ok:
                return response.json()
            elif (
                response.status_code == 503 and i < retries - 1
            ):  # Server Error: Service Unavailable
                print(f"503 error, retrying in {delay} seconds...")
                time.sleep(delay)
                delay *= 2  # double the delay
            elif response.status_code in {401, 403}:  # Unauthorized or Forbidden
                print("Fetching a new token...")
                self.access_token = self._get_anonymous_access_token()
            elif response.status_code == 404:  # Resource Not Found
                print(f"404 error: Resource not found for url: {url}")
                return None
            else:
                response.raise_for_status()

    def _get_anonymous_access_token(self):
        response = requests.post(
            "https://api.ah.nl/mobile-auth/v1/auth/token/anonymous",
            headers=self.HEADERS,
            json={"clientId": "appie"},
        )
        if not response.ok:
            response.raise_for_status()
        return response.json()

    def search_products(self, query=None, page=0, size=750, sort="RELEVANCE"):
        url = "https://api.ah.nl/mobile-services/product/search/v2?sortOn=RELEVANCE"
        params = {"sortOn": sort, "page": page, "size": size, "query": query}
        return self._make_request(url, params)

    def search_all_products(self, **kwargs):
        """
        Iterate all the products available, filtering by query or other filters. Will return generator.
        :param kwargs: See params of 'search_products' method, note that size should not be altered to optimize/limit pages
        :return: generator yielding products

        # Doesn't work well
        """
        response = self.search_products(page=0, **kwargs)
        yield from response["products"]

        print(f"Need to look into {response['page']['totalPages']} more pages!")

        for page in range(1, response["page"]["totalPages"]):
            response = self.search_products(page=page, **kwargs)
            yield from response["products"]

    def get_product_by_barcode(self, barcode):
        url = "https://api.ah.nl/mobile-services/product/search/v1/gtin/{}".format(
            barcode
        )
        return self._make_request(url)

    def get_product_details(self, product):
        """
        Get advanced details of a product
        :param product: Product ID (also called webshopId) or original object containing webshopId
        :return: dict containing product information
        """
        product_id = product if not isinstance(product, dict) else product["webshopId"]
        url = "https://api.ah.nl/mobile-services/product/detail/v4/fir/{}".format(
            product_id
        )
        return self._make_request(url)

    def get_categories(self):
        url = "https://api.ah.nl/mobile-services/v1/product-shelves/categories"
        return self._make_request(url)

    def get_sub_categories(self, category):
        category_id = category if not isinstance(category, dict) else category["id"]
        url = "https://api.ah.nl/mobile-services/v1/product-shelves/categories/{}/sub-categories".format(
            category_id
        )
        return self._make_request(url)

    def get_bonus_periods(self):
        """
        Information about the current bonus periods active.
        Returns a list with all periods, each period has a start and end date and sections, to view the products
        you need the sections within 'urlMetadataList' using 'get_bonus_periods_products'
        """
        response_data = self._make_request(
            "https://api.ah.nl/mobile-services/bonuspage/v1/metadata"
        )
        return response_data["periods"]

    def get_bonus_periods_groups_or_products(self, url):
        return self._make_request(f"https://api.ah.nl/mobile-services/{url}")

    def get_bonus_group_products(self, group_id, date):
        url = f"https://api.ah.nl/mobile-services/bonuspage/v1/segment"
        params = {
            "date": date.strftime("%Y-%m-%d"),
            "segmentId": group_id,
            "includeActivatableDiscount": "false",
        }
        return self._make_request(url, params)

    def create_base_json(self, data_json):
        base = {
            self.SHORT_NAME: {
                "name": self.LONG_NAME,
                "url": self.url,
                "delivery_cost": self.fetch_delivery_cost(),
                "categories": data_json,
            }
        }

        self.save_content_to_file(base, self.ALL_BASE_DATA_FILENAME)

        return base

    def get_category_tree(self, category_id):
        """
        Get the category tree for a given category.
        """
        subcategories = self.get_sub_categories(category_id)

        # Base case: if there are no subcategories, return None
        if not subcategories:
            return None

        category_tree = {}
        for subcategory in subcategories["children"]:
            # Recursively build the tree for each subcategory
            subcategory_tree = self.get_category_tree(int(subcategory["id"]))

            # Add the subcategory (and its possible subcategories) to the tree
            category_tree[subcategory["id"]] = subcategory

            if subcategory_tree:
                category_tree[subcategory["id"]]["subcategories"] = subcategory_tree

        return category_tree

    def extract_categories(self, xml_content=None, scrape=SCRAPE_CATEGORIES):
        category_tree = {}

        if scrape:
            categories = self.get_categories()

            for category in tqdm(
                categories,
                desc=f"Processing subcategories for {self.LONG_NAME}",
                unit="Subcategory",
            ):
                category_name = category["name"]
                category_tree[category_name] = {
                    **category,
                    "subcategories": self.get_category_tree(category["id"]),
                }

                self.save_content_to_file(category_tree, self.CATEGORIES_TREE_FILENAME)

        else:
            folder = self.get_save_folder()
            filepath = os.path.join(folder, self.CATEGORIES_TREE_FILENAME)
            if os.path.exists(filepath):
                with open(filepath, "r") as file:
                    category_tree = json.load(file)
            else:
                print(f"Error: {filepath} does not exist.")

        self.category_tree = category_tree
        return self.category_tree

    def extract_products(self, xml_content, category_json, scrape=SCRAPE_PRODUCTS):
        """Extract products from the XML and appends them to the given category_data."""

        if scrape:
            soup = BeautifulSoup(xml_content, "xml")
            product_urls = [url_tag.text for url_tag in soup.find_all("loc")]

            for product_url in tqdm(
                product_urls,
                desc=f"Scraping Products for {self.LONG_NAME}",
                unit="product",
            ):
                match = re.search(r"/wi(\d+)/", product_url)
                if match:
                    id = match.group(1)
                else:
                    id = None
                    print("Big error")
                    exit(2)

                product = self.get_product_details(id)
                if not product:
                    print(f"Failed to retrieve details for product ID: {id}")
                    continue
                updated_category_json = self.add_product_to_category(
                    product, category_json
                )
            self.save_content_to_file(updated_category_json, self.SCRAPED_DATA_FILENAME)
        else:
            folder = self.get_save_folder()
            filepath = os.path.join(folder, self.SCRAPED_DATA_FILENAME)
            if os.path.exists(filepath):
                with open(filepath, "r") as file:
                    updated_category_json = json.load(file)
            else:
                print(f"Error: {filepath} does not exist.")

        return updated_category_json

    def add_product_to_category(self, product, category_json):
        main_category = product["productCard"].get("mainCategory")
        sub_category_id = product["productCard"].get("subCategoryId")

        if main_category and sub_category_id:
            # Attempt to insert into correct main and subcategory
            if not self.add_product_to_subcategory(
                product, category_json.get(main_category, {})
            ):
                print(
                    f"Couldn't find subcategory with ID {sub_category_id} in main category {main_category}. Adding to 'Uncategorized'."
                )
                self.add_to_uncategorized(product, category_json)
        else:
            if not main_category:
                print(
                    f"Product ID {product['productId']} is missing mainCategory. Adding to 'Uncategorized'."
                )
            if not sub_category_id:
                print(
                    f"Product ID {product['productId']} is missing subCategoryId. Adding to 'Uncategorized'."
                )
            self.add_to_uncategorized(product, category_json)

        return category_json

    def add_to_uncategorized(self, product, category_json):
        """Utility function to add product to 'Uncategorized' category."""
        if "Uncategorized" not in category_json:
            category_json["Uncategorized"] = {"products": []}

        category_json["Uncategorized"]["products"].append(
            self.build_product_data(product)
        )

    def add_product_to_subcategory(self, product, subcategory_data):
        sub_category_id = product["productCard"].get("subCategoryId")

        if not sub_category_id:
            return False

        if "id" in subcategory_data and subcategory_data["id"] == sub_category_id:
            if "products" not in subcategory_data:
                subcategory_data["products"] = []

            subcategory_data["products"].append(self.build_product_data(product))
            return True

        elif "subcategories" in subcategory_data:
            for subcat_key, subcat_value in subcategory_data["subcategories"].items():
                if self.add_product_to_subcategory(product, subcat_value):
                    return True

        return False

    def build_product_data(self, product):
        """Utility function to construct product data from raw product."""
        return {
            "name": product["productCard"].get("title", "Unknown Name"),
            "price": product["productCard"].get("priceBeforeBonus", 0.0),
            "isBonus": product["productCard"].get("isBonus", False),
            "salesUnitSize": product.get("tradeItem", {}).get(
                "measurements", "Unknown Size"
            ),
            "image_url": product["productCard"].get("images", "No Image URL"),
            "description": product["productCard"].get(
                "descriptionFull", "No Description"
            ),
            "webshopId": product.get("productId", "Unknown ID"),
            "gln": product.get("tradeItem", {}).get("gln", "Unknown GLN"),
            "gtin": product.get("tradeItem", {}).get("gtin", "Unknown GTIN"),
        }

    def fetch_delivery_cost(self):
        return None

    def extract_categories_depricated(self, xml_content):
        soup = BeautifulSoup(xml_content, "xml")
        urls = [url_tag.text for url_tag in soup.find_all("loc")]

        root = {"categories": []}

        for url in tqdm(
            urls, desc=f"Processing category URLs for {self.LONG_NAME}", unit="URL"
        ):
            parts = url.split("/producten/")[1].rstrip("/").split("/")
            current_level = root["categories"]

            # Process each segment in the URL
            for i, part in enumerate(parts):
                found = None
                for category in current_level:
                    if category["name"] == part.replace("-", " "):
                        found = category
                        break

                # If segment is not found, create it
                if not found:
                    found = {
                        "name": part.replace("-", " "),
                        "url": url
                        if i == len(parts) - 1
                        else None,  # assign the URL to the deepest level only
                        "categories": [],
                        "products": [],
                    }
                    current_level.append(found)

                # If not the last segment, descend to the next level
                if i < len(parts) - 1:
                    current_level = found["categories"]

        return root
