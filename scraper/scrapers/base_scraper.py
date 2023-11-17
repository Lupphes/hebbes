from abc import abstractmethod
import os
import time
import requests
from protego import Protego
from urllib.parse import urlparse, urljoin
import json


class BaseScraper:
    """
    BaseScraper class acts as the fundamental class for web scraping operations.
    It provides essential properties and methods needed for scraping tasks, which can
    be inherited and expanded upon by specific scraper subclasses.
    """

    BASE_HEADERS = {"User-Agent": "LuppieApp/1.1.28 Android/14.0 Mobile"}
    HEADERS = BASE_HEADERS

    def __init__(
        self,
        base_url,
        data_folder="./data",
        sitemap_categories_filename="categories_sitemap.xml",
        sitemap_products_filename="products_sitemap.xml",
        robots_filename="robots.txt",
        product_filename="products.json",
        category_filename="category.json",
        data_filename="data.json",
    ):
        """
        Initialize the BaseScraper instance.

        :param base_url: Base URL for the website.
        :param data_folder: Main directory for saving data.
        :param sitemap_categories_filename: Name of the file for saving categories' sitemap.
        :param sitemap_products_filename: Name of the file for saving products' sitemap.
        :param product_filename: Name of the file for saving products data.
        :param category_filename: Name of the file for saving categorized products data.
        :param data_filename: Name of the file for saving base data.
        """

        self.base_url = base_url
        self.domain = urlparse(self.base_url).netloc

        # Set instance properties from constructor parameters
        self.main_folder = data_folder
        self.sitemap_categories_filename = sitemap_categories_filename
        self.sitemap_products_filename = sitemap_products_filename
        self.robots_filename = robots_filename
        self.product_filename = product_filename
        self.category_filename = category_filename
        self.data_filename = data_filename
        self.use_categories = False

        print(f"Running scraping for {self.base_url}")
        self.parser = self.initialize_robot_parser()

    @abstractmethod
    def fetch_delivery_cost(self):
        return None

    @abstractmethod
    def get_headers(self):
        """Get the default headers for requests."""
        return self.HEADERS

    @abstractmethod
    def extract_categories(
        self,
        scrape=True,
    ):
        pass

    @abstractmethod
    def extract_products(
        self,
        xml_content,
        scrape=True,
    ):
        pass

    @abstractmethod
    def categorize_products(self, category_json, product_json):
        pass

    def get_save_folder(self):
        """Get the save folder name based on the base URL."""
        return os.path.join(self.main_folder, urlparse(self.base_url).netloc)

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

    def load_content_from_file(self, filename):
        folder = self.get_save_folder()
        filepath = os.path.join(folder, filename)
        if os.path.exists(filepath):
            with open(filepath, "r") as f:
                return json.load(f)
        else:
            print(f"Error: {filepath} does not exist.")
            raise Exception()

    def create_base_json(self, data_json, short_name, long_name):
        base = {
            short_name: {
                "name": long_name,
                "url": self.base_url,
                "delivery_cost": self.fetch_delivery_cost() if not None else "null",
            }
        }
        base[short_name]["categories"] = data_json

        self.save_content_to_file(base, self.data_filename)
        return base

    def fetch_content(self, url=None):
        url = url or self.base_url

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
            response.raise_for_status()
            raise Exception()

    def initialize_robot_parser(self):
        robots_url = urljoin(self.base_url, self.robots_filename)

        response = requests.get(robots_url, headers=self.BASE_HEADERS, timeout=10)
        if response.status_code == 200:
            content = response.text
            parser = Protego.parse(content)
            self.save_content_to_file(content.encode(), self.robots_filename)
        else:
            print(
                f"Failed to retrieve the page from {robots_url}. Status code: {response.status_code}"
            )
            raise Exception()
        return parser

    def _make_request(
        self,
        url,
        _get_anonymous_access_token=None,
        params=None,
        retries=3,
        delay=None,
    ):
        """A generic function to make a GET request with the common headers and authorization token."""
        delay = delay or 1

        for i in range(retries):
            response = requests.get(
                url,
                headers=self.get_headers(),
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
            elif _get_anonymous_access_token and response.status_code in {
                401,
                403,
            }:  # Unauthorized or Forbidden
                print("Fetching a new token...")
                self.access_token = _get_anonymous_access_token()
            elif response.status_code == 404:  # Resource Not Found
                print(f"404 error: Resource not found for url: {url}")
                return None
            else:
                response.raise_for_status()
        raise Exception()
