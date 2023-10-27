import json
import os
import re
import time
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import requests
from .base_scraper import BaseScraper
from tqdm import tqdm


class AHScraper(BaseScraper):
    """Scraper for the Alber Heijn website."""

    SHORT_NAME = "ah"
    LONG_NAME = "Alber Heijn"
    BASE_URL = "https://www.ah.nl/"

    HEADERS = {
        "Host": "api.ah.nl",
        "x-dynatrace": "MT_3_4_772337796_1_fae7f753-3422-4a18-83c1-b8e8d21caace_0_1589_109",
        "x-application": "AHWEBSHOP",
        "User-Agent": "LuppieApp/1.1.28 Android/14.0 Mobile",
        "Content-Type": "application/json; charset=UTF-8",
    }

    def __init__(
        self,
        scrape_categories: bool = False,
        scrape_products: bool = False,
        use_categories: bool = True,
        categories_sitemap_url: str = None,
        products_sitemap_url: str = None,
    ) -> None:
        """
        Initialize the AHScraper instance.

        :param base_url: Base URL for the website.
        :param scrape_categories: Whether to scrape categories or use the file in the data folder.
        :param scrape_products: Whether to scrape products or use the file in the data folder.
        :param use_categories: If True, try to maintain the product structure as store categories suggest,
                               otherwise, all products will be put into arrays.
        :param categories_sitemap_url: URL for the categories sitemap.
        :param products_sitemap_url: URL for the products sitemap.
        """

        self.access_token = self._get_anonymous_access_token()
        super().__init__(self.BASE_URL)
        self.base_url = self.BASE_URL
        self.scrape_categories = scrape_categories
        self.scrape_products = scrape_products
        self.use_categories = use_categories
        self.categories_sitemap_url = categories_sitemap_url or urljoin(
            self.base_url, "sitemaps/entities/products/categories.xml"
        )
        self.products_sitemap_url = products_sitemap_url or urljoin(
            self.base_url, "sitemaps/entities/products/detail.xml"
        )

    def run(self):
        xml_categories = self.fetch_sitemap(
            self.categories_sitemap_url, self.categories_file_name
        )

        xml_products = self.fetch_sitemap(
            self.products_sitemap_url, self.products_file_name
        )

        category_json = None
        # If required by user create a category structure to which
        # products will be added, however it will be always be saved
        if not self.use_categories and not self.scrape_categories:
            category_json = None
        else:
            category_json = self.extract_categories()

        data_json = self.extract_products(xml_products, category_json)
        self.create_base_json(data_json)

    def _get_headers(self):
        """Override to add the Authorization header for AHScraper."""
        return {
            **super()._get_headers(),
            "Authorization": "Bearer {}".format(self.access_token.get("access_token")),
        }

    def _get_anonymous_access_token(self):
        response = requests.post(
            "https://api.ah.nl/mobile-auth/v1/auth/token/anonymous",
            headers=self.HEADERS,
            json={"clientId": "appie"},
            timeout=10,
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
        url = f"https://api.ah.nl/mobile-services/product/search/v1/gtin/{barcode}"
        return self._make_request(url)

    def get_product_details(self, product):
        """
        Get advanced details of a product
        :param product: Product ID (also called webshopId) or original object containing webshopId
        :return: dict containing product information
        """
        product_id = product if not isinstance(product, dict) else product["webshopId"]
        url = f"https://api.ah.nl/mobile-services/product/detail/v4/fir/{product_id}"
        return self._make_request(url)

    def get_categories(self):
        url = "https://api.ah.nl/mobile-services/v1/product-shelves/categories"
        return self._make_request(url)

    def get_sub_categories(self, category):
        category_id = category if not isinstance(category, dict) else category["id"]
        url = f"https://api.ah.nl/mobile-services/v1/product-shelves/categories/{category_id}/sub-categories"
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

    def _extract_product_id(self, product_url):
        match = re.search(r"/wi(\d+)/", product_url)
        return match.group(1) if match else None

    def add_product_to_category(self, product, category_json):
        main_category = product["productCard"].get("mainCategory")
        sub_category_id = product["productCard"].get("subCategoryId")

        matched_category = None
        for _, category_data in category_json.items():
            if category_data.get("name") == main_category:
                matched_category = category_data
                break

        if main_category and sub_category_id and matched_category:
            # Attempt to insert into correct main and subcategory
            if not self.add_product_to_subcategory(product, matched_category):
                print(
                    f"Product ID {product['productId']}: Couldn't find subcategory with ID {sub_category_id} in main category {main_category}. Adding to 'Uncategorized'."
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

    def process_category(self, category):
        subcategories_data = self.get_sub_categories(category)
        subcategories = {}

        for sub_cat in subcategories_data["children"]:
            sub_cat_name = self.get_category_name(sub_cat)

            subcategories[sub_cat_name] = self.process_category(sub_cat)

        if not subcategories:
            return {**category}

        return {**category, "subcategories": subcategories}

    def get_category_name(self, category):
        return int(category["id"])
