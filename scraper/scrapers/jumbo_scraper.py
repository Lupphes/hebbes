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
        use_categories: bool = True,
        categories_sitemap_url: str | None = None,
        products_sitemap_url: str | None = None,
        data_folder="./data",
    ) -> None:
        """
        Initialize the JumboScraper instance.

        :param scrape_categories: Whether to scrape categories or use the file in the data folder.
        :param scrape_products: Whether to scrape products or use the file in the data folder.
        :param use_categories: If True, try to maintain the product structure as store categories suggest,
                               otherwise, all products will be put into arrays.
        :param categories_sitemap_url: URL for the categories sitemap.
        :param products_sitemap_url: URL for the products sitemap.
        :param data_folder: Data folder where everything will be saved.
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
        xml_categories = self.fetch_content(self.categories_sitemap_url)
        self.save_content_to_file(xml_categories, self.sitemap_categories_filename)

        xml_products = self.fetch_content(self.products_sitemap_url)
        self.save_content_to_file(xml_products, self.sitemap_products_filename)

        category_json = self.extract_categories(scrape=self.scrape_categories)

        product_json = self.extract_products(
            xml_products,
            scrape=self.scrape_products,
        )

        if self.use_categories:
            self.categorize_products(category_json, product_json)

        self.create_base_json(product_json, self.SHORT_NAME, self.LONG_NAME)

    def _extract_product_id(self, product_url):
        match = re.search(r"-([^-\s]+)$", product_url)
        return match.group(1) if match else None

    def build_product_data(self, product, product_url):
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

        product_info = product["product"]["data"]
        price_value = (
            product_info.get("prices", {}).get("price", {}).get("amount", "null")
        )

        if price_value != "null":
            try:
                price = float(price_value) / 100
            except ValueError:
                price = None
        else:
            price = None

        return {
            "name": product_info.get("title", "null"),
            "picture_links": product_info.get("imageInfo", {}).get("primaryView", []),
            "brand": product_info.get("brandInfo", {}).get("brandDescription", "null"),
            "measurements": {
                "units": "null",
                "amount": "null",
                "label": product_info.get("quantity", "null"),
            },
            "description": product_info.get("detailsText", "null"),
            "gln": "null",
            "gtin": gtin,
            "specific": {"health": {}, "envinronemt": {}},
            "category": {
                "top_category_name": product_info.get("topLevelCategory", "null"),
                "sub_category_name": "null",
                "sub_category_id": "null",
                "top_category_id": product_info.get("topLevelCategoryId", "null"),
            },
            "stores": {
                self.SHORT_NAME: {
                    "webshopId": product_info.get("id", "null"),
                    "link": product_url,
                    "price": price,
                }
            },
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
        if response is None:
            raise Exception()
        yield from response["products"]["data"]

        for page in range(1, ceil(response["products"]["total"] / size)):
            try:
                response = self.search_products(page=page, **kwargs)
                if response is None:
                    raise Exception()
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
        subcategory_data = self.get_sub_categories(category)
        subcategory = {}

        if subcategory_data is None:
            raise Exception

        for sub_cat in subcategory_data:
            sub_cat_name = sub_cat["catId"]

            subcategory[sub_cat_name] = self.process_category(sub_cat)

        parsed_category = {
            "id": category.get("catId", "null"),
            "name": category.get("title", "null").lower().replace(" ", "-"),
            "label": category.get("title", "null"),
            "picture_links": [
                category.get("backgroundImageUrl", []).get("primaryView", [])
            ],
        }

        if not subcategory:
            return {**parsed_category}

        return {**parsed_category, "subcategory": subcategory}

    def extract_categories(
        self,
        scrape=True,
    ):
        category_tree = {}

        if scrape:
            categories = self.get_categories()
            for category in tqdm(
                categories,
                desc=f"Processing main categories for {self.LONG_NAME}",
                unit="Category",
            ):
                category_name = category["catId"]
                category_tree[category_name] = self.process_category(category)

            self.save_content_to_file(category_tree, self.category_filename)
        else:
            category_tree = self.load_content_from_file(self.category_filename)

        return category_tree

    def extract_products(
        self,
        xml_content,
        scrape=True,
    ):
        """Extract products from the XML and appends them to the given category_data."""

        if scrape:
            soup = BeautifulSoup(xml_content, "xml")
            product_urls = [url_tag.text for url_tag in soup.find_all("loc")]
            products = []

            for product_url in tqdm(
                product_urls,
                desc=f"Scraping products for {self.LONG_NAME}",
                unit="product",
            ):
                product_id = self._extract_product_id(product_url)

                if not product_id:
                    print("Error: Unable to extract product ID.")
                    continue

                product = self.get_product_details(product_id)

                if not product:
                    print(f"Failed to retrieve details for product ID: {id}")
                    continue

                product_data = self.build_product_data(product, product_url)
                products.append(product_data)

            self.save_content_to_file(products, self.product_filename)
        else:
            products = self.load_content_from_file(self.product_filename)

        return products

    def categorize_products(self, category_json, product_json):
        key = {}
        for category_data in category_json.values():
            category_name = category_data.get("name")
            category_id = category_data.get("id")
            if category_name is not None and category_id is not None:
                key[category_name] = category_id

        print(key)

        print(
            "Jumbo API does not provide detailed categorization. Categorization is done with top categories."
        )
        self.save_content_to_file(product_json, "cat_" + self.product_filename)
