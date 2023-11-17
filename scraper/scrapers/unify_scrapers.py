import os
import json


class Unification:
    def __init__(self, data_folder, main_domain):
        self.data_folder = data_folder
        self.domain_list = domain_list
        self.main_category_settings = main_category_settings
        self.unified_data = {}

        print(domain_list)

    def unify_data(self):
        for domain in self.domain_list:
            domain_path = os.path.join(self.data_folder, domain)
            base_data_file = os.path.join(domain_path, "base_data.json")

            if os.path.exists(base_data_file):
                with open(base_data_file, "r", encoding="utf-8") as file:
                    base_data = json.load(file)

                self.traverse_data(base_data)

                unified_data_file = os.path.join(domain_path, "unified_data.json")
                with open(unified_data_file, "w", encoding="utf-8") as file:
                    json.dump(base_data, file, ensure_ascii=False, indent=4)

    def traverse_data(self, data):
        for key, value in data.items():
            if key == "products":
                self.process_products(value)
            elif isinstance(value, dict):
                self.traverse_data(value)

    def process_products(self, products):
        for product in products:
            gtin = product.get("gtin")
            if gtin:
                # This will replace the existing product with the same gtin (unifying the data based on gtin)
                self.unified_data[gtin] = product


if __name__ == "__main__":
    # Example Usage
    domains = ["www.ah.nl", "www.example.com"]  # Update this list as needed
    data_folder_path = "/path/to/data"  # Specify the path to the data folder
    main_category = "Your_Main_Category_Settings"  # Update as needed

    unifier = Unification(data_folder_path, domains, main_category)
    unifier.unify_data()
