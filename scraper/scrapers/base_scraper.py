import os
import time
import requests
from protego import Protego
from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup
import json
from tqdm import tqdm


class BaseScraper:
    """
    BaseScraper class acts as the fundamental class for web scraping operations.
    It provides essential properties and methods needed for scraping tasks, which can
    be inherited and expanded upon by specific scraper subclasses.
    """

    # Class-level constant
    BASE_HEADERS = {"User-Agent": "LuppieApp/1.1.28 Android/14.0 Mobile"}

    def __init__(
        self,
        url,
        main_folder="data",
        categories_file_name="categories_sitemap.xml",
        products_file_name="products_sitemap.xml",
        robots_file_name="robots.txt",
        categories_tree_filename="category_tree_full.json",
        products_data_filename="products.json",
        categorized_products_data_filename="categorized_products.json",
        all_base_data_filename="base_data.json",
        base_headers=None,
    ):
        """
        Initialize the BaseScraper instance.

        :param url: Base URL for the website.
        :param main_folder: Main directory for saving data.
        :param categories_file_name: Name of the file for saving categories' sitemap.
        :param products_file_name: Name of the file for saving products' sitemap.
        :param robots_file_name: Name of the file for saving robots.txt content.
        :param categories_tree_filename: Name of the file for saving category tree data.
        :param products_data_filename: Name of the file for saving products data.
        :param categorized_products_data_filename: Name of the file for saving categorized products data.
        :param all_base_data_filename: Name of the file for saving base data.
        :param base_headers: HTTP headers for web requests.
        """

        self.url = url
        self.domain = urlparse(url).netloc

        # Set instance properties from constructor parameters
        self.main_folder = main_folder
        self.categories_file_name = categories_file_name
        self.products_file_name = products_file_name
        self.robots_file_name = robots_file_name
        self.categories_tree_filename = categories_tree_filename
        self.products_data_filename = products_data_filename
        self.categorized_products_data_filename = categorized_products_data_filename
        self.all_base_data_filename = all_base_data_filename
        self.base_headers = base_headers or self.BASE_HEADERS

        print(f"Running scraping for {self.url}")
        self.initialize_robot_parser()

    def create_base_json(self, data_json):
        key_name = "categories" if self.use_categories else "products"
        base = {
            self.SHORT_NAME: {
                "name": self.LONG_NAME,
                "url": self.url,
                "delivery_cost": self.fetch_delivery_cost(),
                "use_categories": self.use_categories,
            }
        }
        base[self.SHORT_NAME][key_name] = data_json

        self.save_content_to_file(base, self.all_base_data_filename)
        return base

    def fetch_delivery_cost(self):
        return None

    def get_categories(self):
        pass

    def process_category(self, category):
        print("Derived classes must implement process_category")

    def get_category_name(self, category):
        print("Derived classes must implement get_category_name")

    def _extract_product_id(self, product_url):
        """Extract product ID from the given product URL."""
        pass

    def build_product_data(self, product):
        pass

    def initialize_robot_parser(self):
        robots_url = urljoin(self.url, self.robots_file_name)

        response = requests.get(robots_url, headers=self.BASE_HEADERS, timeout=10)
        if response.status_code == 200:
            content = response.text
            self.parser = Protego.parse(content)
            self.save_content_to_file(content.encode(), self.robots_file_name)
        else:
            print(
                f"Failed to retrieve the page from {robots_url}. Status code: {response.status_code}"
            )

    def fetch_content(self, url=None):
        url = url or self.url

        # Check if we can fetch the content based on robots.txt
        if not self.parser.can_fetch(self.BASE_HEADERS["User-Agent"], url):
            print(f"Not allowed to fetch content from: {url} based on robots.txt.")
            return None

        response = requests.get(url, headers=self.BASE_HEADERS, timeout=10)
        if response.status_code == 200:
            return response.content
        else:
            print(
                f"Failed to retrieve the page from {url}. Status code: {response.status_code}"
            )
            return None

    def fetch_sitemap(self, sitemap, filename):
        content = self.fetch_content(sitemap)
        if content:
            self.save_content_to_file(content, filename)
        return content

    def get_save_folder(self):
        """Get the save folder name based on the base URL."""
        return os.path.join(self.main_folder, urlparse(self.url).netloc)

    def save_content_to_file(self, content, filename):
        """Save given content to a file within the scraper's save folder."""
        folder = self.get_save_folder()
        if not os.path.exists(folder):
            os.makedirs(folder)
        filepath = os.path.join(folder, filename)

        if isinstance(content, (dict, list)):
            with open(filepath, "w", encoding="utf-8") as file:
                json.dump(content, file, ensure_ascii=False, indent=4)
        elif isinstance(content, str):
            with open(filepath, "w", encoding="utf-8") as file:
                file.write(content)
        else:
            with open(filepath, "wb") as file:
                file.write(content)

    def _make_request(self, url, params=None, retries=3, delay=None):
        """A generic function to make a GET request with the common headers and authorization token."""
        delay = delay or 1

        for i in range(retries):
            response = requests.get(
                url,
                headers=self._get_headers(),
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

    def _get_headers(self):
        """Get the default headers for requests."""
        return self.HEADERS

    def extract_categories(self, xml_content=None, scrape=None):
        if scrape is None:
            scrape = self.scrape_categories

        category_tree = {}

        if scrape:
            categories = self.get_categories()
            for category in tqdm(
                categories,
                desc=f"Processing main categories for {self.LONG_NAME}",
                unit="Category",
            ):
                category_name = self.get_category_name(category)
                category_tree[category_name] = self.process_category(category)

            self.save_content_to_file(category_tree, self.categories_tree_filename)
        else:
            folder = self.get_save_folder()
            filepath = os.path.join(folder, self.categories_tree_filename)
            if os.path.exists(filepath):
                with open(filepath, "r") as file:
                    category_tree = json.load(file)
            else:
                print(f"Error: {filepath} does not exist.")

        self.category_tree = category_tree
        return self.category_tree

    def extract_products(self, xml_content, category_json=None, scrape=None):
        """Extract products from the XML and appends them to the given category_data."""

        if scrape is None:
            scrape = self.scrape_products

        if scrape:
            soup = BeautifulSoup(xml_content, "xml")
            product_urls = [url_tag.text for url_tag in soup.find_all("loc")]
            products = []

            for product_url in tqdm(
                product_urls,
                desc=f"Scraping Products for {self.LONG_NAME}",
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

                product_data = self.build_product_data(product)
                products.append(product_data)

                if self.use_categories:
                    category_json = self.add_product_to_category(product, category_json)

            # Save all products
            self.save_content_to_file(products, self.products_data_filename)

            # Save categorized data if `self.use_categories` is True.
            if self.use_categories:
                self.save_content_to_file(
                    category_json, self.categorized_products_data_filename
                )

        else:
            file = self.products_data_filename
            if self.use_categories:
                file = self.categorized_products_data_filename
            folder = self.get_save_folder()
            filepath = os.path.join(folder, file)
            if os.path.exists(filepath):
                with open(filepath, "r") as file:
                    products = json.load(file)
            else:
                print(f"Error: {filepath} does not exist.")
                return []

        return products
