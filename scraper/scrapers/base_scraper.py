from abc import ABC, abstractmethod
import os
import requests
from protego import Protego
from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup
import json
from tqdm import tqdm


class BaseScraper(ABC):
    MAIN_FOLDER = "data"
    CATEGORIES_FILE_NAME = "categories_sitemap.xml"
    PRODUCTS_FILE_NAME = "products_sitemap.xml"
    ROBOTS_FILE_NAME = "robots.txt"
    CATEGORIES_TREE_FILENAME = "category_tree_full.json"
    SCRAPED_DATA_FILENAME = "scraped_data.json"
    ALL_BASE_DATA_FILENAME = "base_data.json"
    BASE_HEADERS = {"User-Agent": "LuppieApp/1.1.28 Android/14.0 Mobile"}

    def __init__(
        self,
        url,
        categories_url=None,
        products_url=None,
    ):
        self.url = url
        self.domain = urlparse(url).netloc
        print(f"Running scraping for {self.url}")
        self.initialize_robot_parser()

        xml_categories = None
        xml_products = None

        if categories_url:
            xml_categories = self.fetch_sitemap(
                categories_url, self.CATEGORIES_FILE_NAME
            )

        if products_url:
            xml_products = self.fetch_sitemap(products_url, self.PRODUCTS_FILE_NAME)

        category_json = self.extract_categories(xml_categories)
        data_json = self.extract_products(xml_products, category_json)
        self.create_base_json(data_json)

    @abstractmethod
    def create_base_json(self, data_json=None):
        return {}

    @abstractmethod
    def extract_categories(self, xml_categories=None):
        return {}

    @abstractmethod
    def extract_products(self, xml_products=None, category_json=None):
        pass

    @abstractmethod
    def fetch_delivery_cost(self):
        return None

    def initialize_robot_parser(self):
        robots_url = urljoin(self.url, self.ROBOTS_FILE_NAME)

        response = requests.get(robots_url, headers=self.BASE_HEADERS, timeout=10)
        if response.status_code == 200:
            content = response.text
            self.parser = Protego.parse(content)
            self.save_content_to_file(content.encode(), self.ROBOTS_FILE_NAME)
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
        return os.path.join(self.MAIN_FOLDER, urlparse(self.url).netloc)

    def save_content_to_file(self, content, filename):
        """Save given content to a file within the scraper's save folder."""
        folder = self.get_save_folder()
        if not os.path.exists(folder):
            os.makedirs(folder)
        filepath = os.path.join(folder, filename)

        if isinstance(content, dict):
            with open(filepath, "w", encoding="utf-8") as file:
                json.dump(content, file, ensure_ascii=False, indent=4)
        elif isinstance(content, str):
            with open(filepath, "w", encoding="utf-8") as file:
                file.write(content)
        else:
            with open(filepath, "wb") as file:
                file.write(content)
