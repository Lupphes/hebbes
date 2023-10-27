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
    """Scraper for the JUMBO website."""

    SHORT_NAME = "jmb"
    LONG_NAME = "JUMBO"
    BASE_URL = "https://www.jumbo.com/"

    HEADERS = {
        "User-Agent": "LuppieApp/1.1.28 Android/14.0 Mobile",
        "Accept": "*/*",
        "Accept-Encoding": "identity",
    }
    API_VERSION = "v17"

    def __init__(
        self,
        scrape_categories: bool = False,
        scrape_products: bool = False,
        use_categories: bool = False,
        categories_sitemap_url: str = None,
        products_sitemap_url: str = None,
    ) -> None:
        """
        Initialize the JumboScraper instance.

        :param base_url: Base URL for the website.
        :param scrape_categories: Whether to scrape categories or use the file in the data folder.
        :param scrape_products: Whether to scrape products or use the file in the data folder.
        :param use_categories: If True, try to maintain the product structure as store categories suggest,
                               otherwise, all products will be put into arrays.
        :param categories_sitemap_url: URL for the categories sitemap. Defaults to a constructed URL based on base_url.
        :param products_sitemap_url: URL for the products sitemap. Defaults to a constructed URL based on base_url.
        """

        super().__init__(self.BASE_URL)
        self.base_url = self.BASE_URL
        self.scrape_categories = scrape_categories
        self.scrape_products = scrape_products
        self.use_categories = use_categories
        self.categories_sitemap_url = categories_sitemap_url or (
            self.base_url + "dam/jumbo/sitemaps-non-aem/sitemap_product_listers.xml"
        )
        self.products_sitemap_url = products_sitemap_url or (
            self.base_url + "dam/jumbo/sitemaps-non-aem/sitemap_product_detailpages.xml"
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

    def _extract_product_id(self, product_url):
        match = re.search(r"-([^-\s]+)$", product_url)
        return match.group(1) if match else None

    def add_product_to_category(self, product, category_json):
        """The Jumbo items does not provide exact subcategory. Sad"""
        # Check if the product is delisted

        availability_reason = (
            product["product"]["data"].get("availability", {}).get("reason")
        )
        if availability_reason == "DELISTED":
            return category_json

        main_category = product["product"]["data"].get("topLevelCategory")

        if main_category:
            if main_category not in category_json:
                category_json[main_category] = {}
            if "products" not in category_json[main_category]:
                category_json[main_category]["products"] = []

            category_json[main_category]["products"].append(
                self.build_product_data(product["product"])
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
            product["product"]["data"]
            .get("imageInfo", {})
            .get("primaryView", [{}])[0]
            .get("url", "No Image URL")
        )

        gtin_matches = re.search(
            r"(\d{8,14})(?:_C1N1|_180|_H1N1|_1\.png|_1_T1_)", image_url
        )
        gtin = gtin_matches.group(1) if gtin_matches else "Unknown GTIN"

        return {
            "name": product["product"]["data"].get("title", "Unknown Name"),
            "price": product["product"]["data"].get("prices", 0.0),
            "salesUnitSize": product["product"]["data"].get("quantity", "Unknown Size"),
            "image_url": image_url,
            "description": product["product"]["data"].get(
                "detailsText", "No Description"
            ),
            "id": product["product"]["data"].get("id", "Unknown ID"),
            "gtin": gtin,
        }

    def fetch_delivery_cost(self):
        return None

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

    def process_category(self, category):
        subcategories_data = self.get_sub_categories(category)
        subcategories = {}

        for sub_cat in subcategories_data:
            sub_cat_name = self.get_category_name(sub_cat)
            subcategories[sub_cat_name] = self.process_category(sub_cat)

        if not subcategories:
            return {**category}

        return {**category, "subcategories": subcategories}

    def get_category_name(self, category):
        return category["title"]
