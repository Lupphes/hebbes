from bs4 import BeautifulSoup
from .base_scraper import BaseScraper


class CoopScraper(BaseScraper):
    BASE_URL = "https://www.coop.nl/"
    SHORT_NAME = "coop"
    LONG_NAME = "COOP"
    CATEGORIES_SITEMAP_URL = BASE_URL + "sitemap/catalogs"
    PRODUCTS_SITEMAP_URL = (
        BASE_URL + "https://www.coop.nl/sitemap/products/0"  # till 29
    )
    SCRAPE_CATEGORIES = False
    SCRAPE_PRODUCTS = True

    def __init__(self):
        super().__init__(
            self.BASE_URL,
            self.CATEGORIES_SITEMAP_URL,
            self.PRODUCTS_SITEMAP_URL,
        )

    def extract_categories(self, xml_content):
        return {}

    def extract_products(self, xml_content, category_json):
        pass

    def create_base_json(self, data_json):
        pass

    def fetch_delivery_cost(self):
        return None
