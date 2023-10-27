import time
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
from urllib.parse import urljoin


class ALDIScraper(BaseScraper):
    BASE_URL = "https://www.aldi.nl/"
    SHORT_NAME = "aldi"
    LONG_NAME = "ALDI Supermarkten"
    CATEGORIES_SITEMAP_URL = BASE_URL + ".aldi-nord-sitemap-pages.xml"  # /producten
    PRODUCTS_SITEMAP_URL = BASE_URL + ".aldi-nord-sitemap-pages.xml"  # /product
    SCRAPE_CATEGORIES = False
    SCRAPE_PRODUCTS = True

    def __init__(self):
        super().__init__(
            self.BASE_URL,
            self.CATEGORIES_SITEMAP_URL,
            self.PRODUCTS_SITEMAP_URL,
        )

    def extract_categories(self, xml_content):
        category_prefix = urljoin(self.BASE_URL, "/producten/")
        filtered_xml = self.filter_xml_by_prefix(xml_content, category_prefix)
        self.save_content_to_file(filtered_xml, self.CATEGORIES_FILE_NAME)

        return filtered_xml

    def extract_products(self, xml_content, category_json):
        product_prefix = urljoin(self.BASE_URL, "/product/")
        filtered_xml = self.filter_xml_by_prefix(xml_content, product_prefix)
        self.save_content_to_file(filtered_xml, self.PRODUCTS_FILE_NAME)

        return filtered_xml

    def filter_xml_by_prefix(self, xml_content, prefix):
        soup = BeautifulSoup(xml_content, "xml")

        for url_tag in soup.find_all("url"):
            loc_tag = url_tag.find("loc")

            if not loc_tag or not loc_tag.text.strip().startswith(prefix):
                url_tag.extract()

        return soup.prettify()

    def create_base_json(self, data_json):
        pass

    def fetch_delivery_cost(self):
        return None
