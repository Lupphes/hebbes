import re
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import requests
from .base_scraper import BaseScraper
from tqdm import tqdm


class AHScraper(BaseScraper):
    """Scraper for the Alber Heijn website."""

    SHORT_NAME = "ah"
    LONG_NAME = "Alber Heijn"
    BASE_URL = "https://www.ah.nl/"

    HEADERS = {
        "Host": "api.ah.nl",
        "x-dynatrace": "MT_3_4_772337796_1_fae7f753-3422-4a18-83c1-b8e8d21caace_0_1589_109",
        "x-application": "AHWEBSHOP",
        "User-Agent": "LuppieApp/1.1.28 Android/14.0 Mobile",
        "Content-Type": "application/json; charset=UTF-8",
    }

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
        Initialize the AHScraper instance.

        :param scrape_categories: Whether to scrape categories or use the file in the data folder.
        :param scrape_products: Whether to scrape products or use the file in the data folder.
        :param use_categories: If True, try to maintain the product structure as store categories suggest,
                               otherwise, all products will be put into arrays.
        :param categories_sitemap_url: URL for the categories sitemap.
        :param products_sitemap_url: URL for the products sitemap.
        :param data_folder: Data folder where everything will be saved.
        """

        self.access_token = self.get_anonymous_access_token()
        super().__init__(base_url=self.BASE_URL, data_folder=data_folder)
        self.scrape_categories = scrape_categories
        self.scrape_products = scrape_products
        self.use_categories = use_categories
        self.categories_sitemap_url = categories_sitemap_url or urljoin(
            self.BASE_URL, "sitemaps/entities/products/categories.xml"
        )
        self.products_sitemap_url = products_sitemap_url or urljoin(
            self.BASE_URL, "sitemaps/entities/products/detail.xml"
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

    def get_headers(self):
        """Override to add the Authorization header for AHScraper."""
        return {
            **super().get_headers(),
            "Authorization": "Bearer {}".format(self.access_token.get("access_token")),
        }

    def get_anonymous_access_token(self):
        response = requests.post(
            "https://api.ah.nl/mobile-auth/v1/auth/token/anonymous",
            headers=self.HEADERS,
            json={"clientId": "appie"},
            timeout=10,
        )
        if not response.ok:
            response.raise_for_status()
        return response.json()

    def search_products(self, query=None, page=0, size=750, sort="RELEVANCE"):
        url = "https://api.ah.nl/mobile-services/product/search/v2?sortOn=RELEVANCE"
        params = {"sortOn": sort, "page": page, "size": size, "query": query}
        return self._make_request(url, self.get_anonymous_access_token, params)

    def search_all_products(self, **kwargs):
        """
        Iterate all the products available, filtering by query or other filters. Will return generator.
        :param kwargs: See params of 'search_products' method, note that size should not be altered to optimize/limit pages
        :return: generator yielding products

        # Doesn't work well
        """
        response = self.search_products(page=0, **kwargs)

        if response is None:
            raise Exception
        yield from response["products"]

        print(f"Need to look into {response['page']['totalPages']} more pages!")

        for page in range(1, response["page"]["totalPages"]):
            response = self.search_products(page=page, **kwargs)
            if response is None:
                raise Exception
            yield from response["products"]

    def get_product_by_barcode(self, barcode):
        url = f"https://api.ah.nl/mobile-services/product/search/v1/gtin/{barcode}"
        return self._make_request(url, self.get_anonymous_access_token)

    def get_product_details(self, product):
        """
        Get advanced details of a product
        :param product: Product ID (also called webshopId) or original object containing webshopId
        :return: dict containing product information
        """
        product_id = product if not isinstance(product, dict) else product["webshopId"]
        url = f"https://api.ah.nl/mobile-services/product/detail/v4/fir/{product_id}"
        return self._make_request(url, self.get_anonymous_access_token)

    def get_categories(self):
        url = "https://api.ah.nl/mobile-services/v1/product-shelves/categories"
        return self._make_request(url, self.get_anonymous_access_token)

    def get_sub_categories(self, category):
        category_id = category if not isinstance(category, dict) else category["id"]
        url = f"https://api.ah.nl/mobile-services/v1/product-shelves/categories/{category_id}/sub-categories"
        return self._make_request(url, self.get_anonymous_access_token)

    def get_bonus_periods(self):
        """
        Information about the current bonus periods active.
        Returns a list with all periods, each period has a start and end date and sections, to view the products
        you need the sections within 'urlMetadataList' using 'get_bonus_periods_products'
        """
        response = self._make_request(
            "https://api.ah.nl/mobile-services/bonuspage/v1/metadata",
            self.get_anonymous_access_token,
        )
        if response is None:
            raise Exception
        return response["periods"]

    def get_bonus_periods_groups_or_products(self, url):
        return self._make_request(
            f"https://api.ah.nl/mobile-services/{url}", self.get_anonymous_access_token
        )

    def get_bonus_group_products(self, group_id, date):
        url = f"https://api.ah.nl/mobile-services/bonuspage/v1/segment"
        params = {
            "date": date.strftime("%Y-%m-%d"),
            "segmentId": group_id,
            "includeActivatableDiscount": "false",
        }
        return self._make_request(url, self.get_anonymous_access_token, params)

    def _extract_product_id(self, product_url):
        match = re.search(r"/wi(\d+)/", product_url)
        return match.group(1) if match else None

    def add_product_to_subcategory(self, sub_category_id, category_data, previous_path):
        if "id" in category_data and category_data["id"] == sub_category_id:
            return {
                "sub_category_name": category_data["name"],
                "sub_category_id": sub_category_id,
                "category_path": previous_path,
            }
        elif "subcategory" in category_data:
            for subcat_key, subcat_value in category_data["subcategory"].items():
                new_path = previous_path + [int(subcat_key)]
                result = self.add_product_to_subcategory(
                    sub_category_id, subcat_value, new_path
                )
                if result:
                    return result
        return None

    def build_product_data(self, product):
        """Utility function to construct product data from raw product."""
        product_info = product["productCard"]
        return {
            "name": product_info.get("title", "null"),
            "piture_links": product_info.get("images", "null"),
            "brand": product_info.get("brand", "null"),
            "measurements": {
                "units": product.get("measurements", {})
                .get("netContent", {})
                .get("measurementUnitCode", {})
                .get("value", "null"),
                "amount": product.get("measurements", {})
                .get("netContent", {})
                .get("value", "null"),
                "label": product_info.get("salesUnitSize", "null"),
            },
            "description": product_info.get("descriptionFull", "null"),
            "gln": product.get("tradeItem", {}).get("gln", "null"),
            "gtin": product.get("tradeItem", {}).get("gtin", "null"),
            "specific": {"health": {}, "envinronemt": {}},
            "category": {
                "top_category_name": product_info.get("mainCategory", "null"),
                "sub_category_name": product_info.get("subCategory", "null"),
                "sub_category_id": product_info.get("subCategoryId", "null"),
                "top_category_id": "null",
            },
            "stores": {
                self.SHORT_NAME: {
                    "webshopId": product.get("productId", "null"),
                    "link": f'https://www.ah.nl/producten/product/wi{product.get("productId", "null")}',
                    "price": product_info["currentPrice"]
                    if "currentPrice" in product_info
                    and product_info["currentPrice"] is not None
                    else product_info.get("priceBeforeBonus", "null"),
                    "discount_info": product_info.get("discountLabels", "null"),
                }
            },
        }

    def fetch_delivery_cost(self):
        return None

    def process_category(self, category):
        subcategory_data = self.get_sub_categories(category)
        subcategory = {}

        if subcategory_data is None:
            raise Exception

        for sub_cat in subcategory_data["children"]:
            sub_cat_name = int(sub_cat["id"])

            subcategory[sub_cat_name] = self.process_category(sub_cat)

        parsed_category = {
            "id": category.get("id", "null"),
            "name": category.get("name", "null"),
            "label": category.get("slugifiedName", "null"),
            "piture_links": category.get("images", "null"),
        }

        if not subcategory:
            return {**parsed_category}

        return {**parsed_category, "subcategory": subcategory}

    def extract_categories(
        self,
        scrape=True,
    ):
        category_tree = {}

        if scrape:
            categories = self.get_categories()
            for category in tqdm(
                categories,
                desc=f"Processing top categories for {self.LONG_NAME}",
                unit="Category",
            ):
                category_name = int(category["id"])
                category_tree[category_name] = self.process_category(category)

            self.save_content_to_file(category_tree, self.category_filename)
        else:
            category_tree = self.load_content_from_file(self.category_filename)

        return category_tree

    def extract_products(
        self,
        xml_content,
        scrape=True,
    ):
        """Extract products from the XML and appends them to the given category_data."""

        if scrape:
            soup = BeautifulSoup(xml_content, "xml")
            product_urls = [url_tag.text for url_tag in soup.find_all("loc")]
            products = []

            for product_url in tqdm(
                product_urls,
                desc=f"Scraping products for {self.LONG_NAME}",
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

            self.save_content_to_file(products, self.product_filename)
        else:
            products = self.load_content_from_file(self.product_filename)

        return products

    def categorize_products(self, category_json, product_json):
        key = {}
        for category_data in category_json.values():
            category_name = category_data.get("name")
            category_id = category_data.get("id")
            if category_name is not None and category_id is not None:
                key[category_name] = category_id

        missing_top_category_count = 0
        missing_but_categorized_count = 0
        missing_and_uncategorized_count = 0
        successful_categorization_count = 0
        uncategorized_count = 0

        for product in tqdm(
            product_json,
            desc=f"Categorizing products for {self.LONG_NAME}",
            unit="product",
        ):
            top_category = product["category"].get("top_category_name")
            sub_category_id = product["category"].get("sub_category_id")

            if sub_category_id:
                if top_category in key:
                    top_category_id = str(key[top_category])
                    updated = self.add_product_to_subcategory(
                        sub_category_id,
                        category_json[top_category_id],
                        [int(top_category_id)],
                    )
                else:
                    missing_top_category_count += 1
                    updated = self.add_product_to_subcategory(
                        sub_category_id, category_json, []
                    )
                    if updated is None:
                        missing_and_uncategorized_count += 1
                    else:
                        missing_but_categorized_count += 1
                if updated is None:
                    product["category"]["top_category_name"] = "Uncategorized"
                    product["category"]["sub_category_name"] = "Uncategorized"
                    product["category"]["sub_category_id"] = "null"
                    product["category"]["category_path"] = "null"
                    uncategorized_count += 1
                    continue
                product["category"] = updated
                product["category"]["top_category_name"] = top_category
                successful_categorization_count += 1
            else:
                if top_category:
                    product["category"]["top_category_name"] = "Uncategorized"
                product["category"]["sub_category_name"] = "Uncategorized"
                product["category"]["sub_category_id"] = "null"
                product["category"]["category_path"] = "null"
                missing_top_category_count += 1
                uncategorized_count += 1

        total_products = len(product_json)
        print(f"Summary for {self.LONG_NAME}:")
        print(f"Total products processed: {total_products}")
        print(
            f"Successful categorizations: {successful_categorization_count} out of {total_products} ({total_products - successful_categorization_count})"
        )
        print(
            f"Uncategorized products: {uncategorized_count} out of {total_products}  ({total_products - uncategorized_count})"
        )
        print(
            f"Products missing top category: {missing_top_category_count} out of {total_products}  ({total_products - missing_top_category_count})"
        )
        print(
            f"Missing top category but categorized: {missing_but_categorized_count} out of {missing_top_category_count}  ({total_products - missing_but_categorized_count})"
        )
        print(
            f"Missing top category and uncategorized: {missing_and_uncategorized_count} out of {missing_top_category_count}  ({total_products - missing_and_uncategorized_count})"
        )

        self.save_content_to_file(product_json, "cat_" + self.product_filename)
