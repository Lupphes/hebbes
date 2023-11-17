from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
from urllib.parse import urljoin


class HoogvlietScraper(BaseScraper):
    SHORT_NAME = "hoogvliet"
    LONG_NAME = "Hoogvliet"
    BASE_URL = "https://www.hoogvliet.com/"

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
        Initialize the HoogvlietScraper instance.

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
        self.categories_sitemap_url = categories_sitemap_url or urljoin(
            self.base_url, "sitemap-catalogcategory-0.xml.gz?SyndicationID=SiteMapXML"
        )
        self.products_sitemap_url = products_sitemap_url or urljoin(
            self.base_url, "sitemap-product-0.xml.gz?SyndicationID=SiteMapXML"
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

    def fetch_delivery_cost(self):
        return None

    def extract_categories(
        self,
        scrape=True,
    ):
        pass

    def extract_products(
        self,
        xml_content,
        scrape=True,
    ):
        pass

    def categorize_products(self, category_json, product_json):
        pass
