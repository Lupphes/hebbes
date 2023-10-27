import json
from math import ceil
import os
import re
import time
from bs4 import BeautifulSoup
import requests
from tqdm import tqdm
from .base_scraper import BaseScraper


class JumboScraper(BaseScraper):
    BASE_URL = "https://www.jumbo.com/"
    SHORT_NAME = "jmb"
    LONG_NAME = "JUMBO"
    CATEGORIES_SITEMAP_URL = (
        BASE_URL + "dam/jumbo/sitemaps-non-aem/sitemap_product_listers.xml"
    )
    PRODUCTS_SITEMAP_URL = (
        BASE_URL + "dam/jumbo/sitemaps-non-aem/sitemap_product_detailpages.xml"
    )
    HEADERS = {
        "User-Agent": "LuppieApp/1.1.28 Android/14.0 Mobile",
        "Accept": "*/*",
        "Accept-Encoding": "identity",
    }
    API_VERSION = "v17"
    SCRAPE_CATEGORIES = False
    SCRAPE_PRODUCTS = True

    def __init__(self):
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

    def extract_categories(self, xml_content=None, scrape=SCRAPE_CATEGORIES):
        def process_category(category):
            """Recursive function to process a category and its subcategories."""
            category_name = category["title"]
            subcategories_data = self.get_sub_categories(category)
            subcategories = {}

            for sub_cat in subcategories_data:
                sub_cat_name = sub_cat["title"]
                subcategories[sub_cat_name] = process_category(sub_cat)

            return {**category, "subcategories": subcategories}

        category_tree = {}

        if scrape:
            categories = self.get_categories()

            for category in tqdm(
                categories,
                desc=f"Processing main categories for {self.LONG_NAME}",
                unit="Category",
            ):
                category_name = category["title"]
                category_tree[category_name] = process_category(category)

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
                match = re.search(r"-([^-\s]+)$", product_url)
                if match:
                    id = match.group(1)
                else:
                    id = None
                    print("Big error")
                    exit(2)

                product = self.get_product_details(id)["product"]
                # print(product)

                if not product:
                    print(f"Failed to retrieve details for product ID: {id}")
                    continue
                updated_category_json = self.add_product_to_category(
                    product, category_json
                )
            self.save_content_to_file(updated_category_json, self.SCRAPED_DATA_FILENAME)
            exit()
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
        # Check if the product is delisted
        availability_reason = product["data"].get("availability", {}).get("reason")
        if availability_reason == "DELISTED":
            return category_json

        main_category = product["data"].get("topLevelCategory")

        if main_category:
            if main_category not in category_json:
                category_json[main_category] = {}
            if "products" not in category_json[main_category]:
                category_json[main_category]["products"] = []

            category_json[main_category]["products"].append(
                self.build_product_data(product)
            )
        else:
            print(
                f"Product ID {product['data'].get('id', 'Unknown ID')} is missing mainCategory. Adding to 'Uncategorized'."
            )
            self.add_to_uncategorized(product, category_json)

        return category_json

    def add_to_uncategorized(self, product, category_json):
        """Utility function to add product to 'Uncategorized' category."""
        if "Uncategorized" not in category_json:
            category_json["Uncategorized"] = []
        category_json["Uncategorized"].append(self.build_product_data(product))

    def build_product_data(self, product):
        """Utility function to construct product data from raw product."""
        image_url = (
            product["data"]
            .get("imageInfo", {})
            .get("primaryView", [{}])[0]
            .get("url", "No Image URL")
        )

        gtin_matches = re.search(r"(\d{8,14})_1\.png$", image_url)
        gtin = gtin_matches.group(1) if gtin_matches else "Unknown GTIN"

        return {
            "name": product["data"].get("title", "Unknown Name"),
            "price": product["data"].get("prices", 0.0),
            "salesUnitSize": product["data"].get("quantity", "Unknown Size"),
            "image_url": image_url,
            "description": product["data"].get("detailsText", "No Description"),
            "id": product["data"].get("id", "Unknown ID"),
            "gtin": gtin,
        }

    def create_base_json(self, data_json):
        pass

    def fetch_delivery_cost(self):
        return None

    def get_category_tree(self, category):
        """
        Get the category tree for a given category.
        """
        subcategories_count = category.get("subCategoriesCount", 0)

        # Base case: if there are no subcategories, return None
        if subcategories_count == 0:
            return None

        subcategories = self.get_sub_categories(category)

        category_tree = {}
        for subcategory in subcategories:
            # Recursively build the tree for each subcategory
            subcategory_tree = self.get_category_tree(subcategory)

            # Add the subcategory (and its possible subcategories) to the tree
            category_tree[subcategory["id"]] = subcategory

            if subcategory_tree:
                category_tree[subcategory["id"]]["subcategories"] = subcategory_tree

        return category_tree

    def search_products(self, query=None, page=0, size=30):
        if (page + 1) * size > 30:
            print("Pagination limit on Jumbo connector of 30")
            raise ValueError("Pagination limit exceeded")

        url = f"https://mobileapi.jumbo.com/{self.API_VERSION}/search"
        params = {"offset": page * size, "limit": size, "q": query}

        response = self._make_request(url, params)

        return response

    def search_all_products(self, **kwargs):
        """
        Iterate all the products available, filtering by query or other filters. Will return generator.
        :param kwargs: See params of 'search_products' method, note that size should not be altered to optimize/limit pages
        :return: generator yielding products
        """
        size = kwargs.pop("size", None) or 30
        response = self.search_products(page=0, size=size, **kwargs)
        yield from response["products"]["data"]

        for page in range(1, ceil(response["products"]["total"] / size)):
            try:
                response = self.search_products(page=page, **kwargs)
            except ValueError as e:
                print("Pagination limit reached, capping response: {}".format(e))
                return
            yield from response["products"]["data"]

    def get_product_by_barcode(self, barcode):
        url = f"https://mobileapi.jumbo.com/{self.API_VERSION}/search"
        params = {"q": barcode}

        response = self._make_request(url, params)

        if response and "products" in response and "data" in response["products"]:
            products = response["products"]["data"]
            return products[0] if products else None
        return None

    def get_product_details(self, product):
        """
        Get advanced details of a product
        :param product: Product ID or raw product object containing ID field
        :return: dict containing product information
        """
        product_id = product if not isinstance(product, dict) else product["id"]
        url = f"https://mobileapi.jumbo.com/{self.API_VERSION}/products/{product_id}"

        response = self._make_request(url)

        return response

    def get_categories(self):
        url = f"https://mobileapi.jumbo.com/{self.API_VERSION}/categories"
        response = self._make_request(url)

        return (
            response["categories"]["data"]
            if response and "categories" in response
            else None
        )

    def get_sub_categories(self, category):
        category_id = category if not isinstance(category, dict) else category["id"]
        url = f"https://mobileapi.jumbo.com/{self.API_VERSION}/categories"
        response = self._make_request(url, params={"id": category_id})

        return (
            response["categories"]["data"]
            if response and "categories" in response
            else None
        )

    def get_all_stores(self):
        url = f"https://mobileapi.jumbo.com/{self.API_VERSION}/stores"
        response = self._make_request(url)

        return response["stores"]["data"] if response and "stores" in response else None

    def get_store(self, store):
        store_id = store if not isinstance(store, dict) else store["id"]
        url = f"https://mobileapi.jumbo.com/{self.API_VERSION}/stores/{store_id}"
        response = self._make_request(url)

        return response["store"]["data"] if response and "store" in response else None

    def get_all_promotions(self):
        url = f"https://mobileapi.jumbo.com/{self.API_VERSION}/promotion-overview"
        response = self._make_request(url)

        return response["tabs"] if response and "tabs" in response else None

    def get_promotions_store(self, store):
        store_id = store if not isinstance(store, dict) else store["id"]
        url = f"https://mobileapi.jumbo.com/{self.API_VERSION}/promotion-overview"
        response = self._make_request(url, params={"store_id": store_id})

        return response["tabs"] if response and "tabs" in response else None
