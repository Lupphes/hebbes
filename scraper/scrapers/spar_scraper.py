from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
from urllib.parse import urljoin


class SPARScraper(BaseScraper):
    SHORT_NAME = "spar"
    LONG_NAME = "SPAR"
    BASE_URL = "https://www.spar.nl/"

    def __init__(
        self,
        scrape_categories: bool = False,
        scrape_products: bool = True,
        use_categories: bool = False,
        categories_sitemap_url: str = None,
        products_sitemap_url: str = None,
    ) -> None:
        """
        Initialize the SPARScraper instance.

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
        self.categories_s
