from bs4 import BeautifulSoup
from .base_scraper import BaseScraper


class PlusScraper(BaseScraper):
    BASE_URL = "https://www.plus.nl/"
    CATEGORIES_SITEMAP_URL = BASE_URL + "sitemapindex-catalogcategory-0.xml.gz"
    PRODUCTS_SITEMAP_URL = BASE_URL + "sitemapindex-product-0.xml.gz"
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
