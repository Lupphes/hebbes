import os
import json
from fuzzywuzzy import fuzz
from tqdm import tqdm


class Unification:
    def __init__(
        self,
        data_folder,
        main_domain,
        add_unmatched_as_new=True,
        fuzzy_match_threshold=70,
        enable_fuzzy_matching=False,
    ):
        self.data_folder = data_folder
        self.main_domain = main_domain
        self.add_unmatched_as_new = add_unmatched_as_new
        self.fuzzy_match_threshold = fuzzy_match_threshold
        self.enable_fuzzy_matching = enable_fuzzy_matching

    def normalize_text(self, text):
        if text is None or text == "null":
            return None
        return text.lower().strip()

    def preprocess_data(self, products):
        for product in products:
            product["normalized_name"] = self.normalize_text(
                product.get("name", "null")
            )
            product["normalized_brand"] = self.normalize_text(
                product.get("brand", "null")
            )
            product["normalized_category"] = self.normalize_text(
                product.get("category", {}).get("top_category_name", "null")
            )
        return products

    def update_product_stores(self):
        main_domain_path = os.path.join(
            self.data_folder, self.main_domain, "cat_products.json"
        )

        with open(main_domain_path, "r") as file:
            main_domain_products = json.load(file)

        main_domain_products = self.preprocess_data(main_domain_products)

        gtin_match_count = 0
        fuzzy_match_count = 0
        new_product_count = 0

        for domain in tqdm(os.listdir(self.data_folder), desc="Processing domains"):
            if domain == self.main_domain:
                continue

            other_domain_path = os.path.join(self.data_folder, domain, "products.json")

            if os.path.exists(other_domain_path):
                with open(other_domain_path, "r") as file:
                    other_domain_products = json.load(file)

                other_domain_products = self.preprocess_data(other_domain_products)

                for product in tqdm(
                    main_domain_products, desc=f"Matching products in {domain}"
                ):
                    if product.get("normalized_brand") == "ah":
                        continue

                    product["composite_score"] = 0
                    product["best_match"] = None
                    main_gtin = product["gtin"].lstrip("0")

                    for other_product in other_domain_products:
                        # Check for GTIN match
                        other_gtin = other_product["gtin"].lstrip("0")
                        if main_gtin == other_gtin:
                            gtin_match_count += 1
                            product["best_match"] = other_product
                            product["stores"].update(other_product["stores"])
                            break

                        if self.enable_fuzzy_matching:
                            score = 0
                            # Fuzzy matching for brand
                            if (
                                product["normalized_brand"]
                                and other_product["normalized_brand"]
                            ):
                                score += (
                                    fuzz.ratio(
                                        product["normalized_brand"],
                                        other_product["normalized_brand"],
                                    )
                                    * 0.5
                                )

                            # Fuzzy matching for product names
                            if (
                                product["normalized_name"]
                                and other_product["normalized_name"]
                            ):
                                score += (
                                    fuzz.token_sort_ratio(
                                        product["normalized_name"],
                                        other_product["normalized_name"],
                                    )
                                    * 0.4
                                )

                            # Fuzzy matching for category
                            if (
                                product["normalized_category"]
                                and other_product["normalized_category"]
                            ):
                                score += (
                                    fuzz.ratio(
                                        product["normalized_category"],
                                        other_product["normalized_category"],
                                    )
                                    * 0.1
                                )

                            # Update the best match if the current score is higher
                            if (
                                score > product["composite_score"]
                                and score >= self.fuzzy_match_threshold
                            ):
                                product["composite_score"] = score
                                product["best_match"] = other_product
                                fuzzy_match_count += 1

                    # Updating stores information for matched products
                    if product["best_match"]:
                        product["stores"].update(product["best_match"]["stores"])

                # Add unmatched products as new items
                if self.add_unmatched_as_new:
                    for other_product in other_domain_products:
                        if (
                            "best_match" not in other_product
                            or not other_product["best_match"]
                        ):
                            main_domain_products.append(other_product)
                            new_product_count += 1

        print(f"Total GTIN matches: {gtin_match_count}")
        print(f"Total Fuzzy matches: {fuzzy_match_count}")
        print(f"Total new products added: {new_product_count}")
        print(f"Total products processed: {len(main_domain_products)}")

        return main_domain_products

    def save_updated_products(self, updated_products):
        main_domain_path = os.path.join(self.data_folder, "merged_products.json")
        with open(main_domain_path, "w") as file:
            json.dump(updated_products, file, indent=4)
