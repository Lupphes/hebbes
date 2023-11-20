import os
import json

from tqdm import tqdm


class Unification:
    def __init__(self, data_folder, main_domain):
        self.data_folder = data_folder
        self.main_domain = main_domain

    def update_product_stores(self):
        main_domain_path = os.path.join(
            self.data_folder, self.main_domain, "cat_products.json"
        )

        with open(main_domain_path, "r") as file:
            main_domain_products = json.load(file)

        match_count = 0

        for domain in tqdm(os.listdir(self.data_folder), desc="Processing domains"):
            if domain == self.main_domain:
                continue

            other_domain_path = os.path.join(self.data_folder, domain, "products.json")

            if os.path.exists(other_domain_path):
                with open(other_domain_path, "r") as file:
                    other_domain_products = json.load(file)

                for product in main_domain_products:
                    main_gtin = product["gtin"].lstrip("0")
                    for other_product in other_domain_products:
                        other_gtin = other_product["gtin"].lstrip("0")
                        if main_gtin == other_gtin:
                            product["stores"].update(other_product["stores"])
                            match_count += 1

        print(f"Matched {match_count} out of {len(main_domain_products)} products.")

        return main_domain_products

    def save_updated_products(self, updated_products):
        main_domain_path = os.path.join(self.data_folder, "merged_products.json")
        with open(main_domain_path, "w") as file:
            json.dump(updated_products, file, indent=4)
