from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
from urllib.parse import urljoin


class CoopScraper(BaseScraper):
    SHORT_NAME = "coop"
    LONG_NAME = "COOP"
    BASE_URL = "https://www.coop.nl/"

    def __init__(
        self,
        scrape_categories: bool = False,
        scrape_products: bool = True,
        use_categories: bool = False,
        categories_sitemap_url: str = None,
        products_sitemap_url: str = None,
    ) -> None:
        """
        Initialize the CoopScraper instance.

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
            self.base_url, "sitemap/catalogs"
        )
        self.products_sitemap_url = (
            products_sitemap_url or self.base_url + "sitemap/products/0"
        )  # till 29

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
        # if not self.use_categories and not self.scrape_categories:
        #     category_json = None
        # else:
        #     category_json = self.extract_categories()

        # data_json = self.extract_products(xml_products, category_json)
        # self.create_base_json(data_json)

    def fetch_delivery_cost(self):
        return None
