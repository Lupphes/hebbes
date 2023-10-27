import time
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
from urllib.parse import urljoin


class ALDIScraper(BaseScraper):
    """Scraper for the ALDI Supermarkten website."""

    SHORT_NAME = "aldi"
    LONG_NAME = "ALDI Supermarkten"
    BASE_URL = "https://www.aldi.nl/"

    def __init__(
        self,
        scrape_categories: bool = False,
        scrape_products: bool = False,
        use_categories: bool = False,
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

        super().__init__(self.BASE_URL)
        self.base_url = self.BASE_URL
        self.scrape_categories = scrape_categories
        self.scrape_products = scrape_products
        self.use_categories = use_categories
        self.categories_sitemap_url = categories_sitemap_url or urljoin(
            self.base_url, ".aldi-nord-sitemap-pages.xml"
        )  # /producten
        self.products_sitemap_url = products_sitemap_url or urljoin(
            self.base_url, ".aldi-nord-sitemap-pages.xml"
        )  # /product

    def run(self):
        category_prefix = urljoin(self.BASE_URL, "/producten/")
        categories_xml_content = self.fetch_content(self.categories_sitemap_url)
        categories_xml_filtered = self.filter_xml_by_prefix(
            categories_xml_content, category_prefix
        )
        self.save_content_to_file(categories_xml_filtered, self.categories_file_name)

        product_prefix = urljoin(self.BASE_URL, "/product/")
        product_xml_content = self.fetch_content(self.products_sitemap_url)
        products_xml_filtered = self.filter_xml_by_prefix(
            product_xml_content, product_prefix
        )
        self.save_content_to_file(products_xml_filtered, self.products_file_name)

        category_json = None
        # If required by user create a category structure to which
        # products will be added, however it will be always be saved
        # if not self.use_categories and not self.scrape_categories:
        #     category_json = None
        # else:
        #     category_json = self.extract_categories()

        # data_json = self.extract_products(products_xml_filtered, category_json)
        # self.create_base_json(data_json)

    def filter_xml_by_prefix(self, xml_content, prefix):
        soup = BeautifulSoup(xml_content, "xml")

        for url_tag in soup.find_all("url"):
            loc_tag = url_tag.find("loc")

            if not loc_tag or not loc_tag.text.strip().startswith(prefix):
                url_tag.extract()

        return soup.prettify()

    def fetch_delivery_cost(self):
        return None
