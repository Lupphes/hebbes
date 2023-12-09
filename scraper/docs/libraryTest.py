import json
import os
from pprint import pprint
from supermarktconnector.ah import AHConnector
from supermarktconnector.jumbo import JumboConnector


def save_content_to_file(content, filename):
    """Save given content to a file within the scraper's save folder."""
    if isinstance(content, (dict, list)):
        with open(filename, "w", encoding="utf-8") as file:
            json.dump(content, file, ensure_ascii=False, indent=4)
    elif isinstance(content, str):
        with open(filename, "w", encoding="utf-8") as file:
            file.write(content)
    else:
        with open(filename, "wb") as file:
            file.write(content)


# ah_connector = AHConnector()
# pprint(ah_connector.search_products())
# pprint(len(list(ah_connector.search_all_products(query="smint"))))
# pprint(ah_connector.get_product_details(ah_connector.get_product_by_barcode("8410031965902")))
# pprint(ah_connector.get_categories())
# pprint(ah_connector.get_sub_categories(ah_connector.get_categories()[0]))

# pprint(ah_connector.search_products("Nutella & go")["products"])

# pprint(ah_connector.get_bonus_periods())
# # pprint(
#     ah_connector.get_bonus_periods_products(
#         ah_connector.get_bonus_periods()[0]["urlMetadataList"][0]["url"]
#     )
# )

# for bonus_prod in ah_connector.get_all_bonus_products():
#     print(bonus_prod)
# aa = ah_connector.test()

# with open("data.json", "w", encoding="utf-8") as file:
#     json.dump(aa, file, ensure_ascii=False, indent=4)
# exit()

# nutella = ah_connector.get_product_details(2800)
# pprint(nutella["productCard"]["title"])
# pprint(nutella["tradeItem"]["gtin"])

# nutella_barcode = nutella["tradeItem"]["gtin"]


# print(list(connector.search_all_products()))


jumbo_connector = JumboConnector()
# pprint(jumbo_connector.search_products(query="Smint"))
# pprint(jumbo_connector.get_product_by_barcode("5000112646627"))
test = list(jumbo_connector.search_all_products())
pprint(test)
# pprint(
#     jumbo_connector.get_product_details(
#         jumbo_connector.get_product_by_barcode("8410031965902")
#     )
# )
# pprint(jumbo_connector.get_categories())
# pprint(jumbo_connector.get_sub_categories(jumbo_connector.get_categories()[0]))


save_content_to_file(test, "lala.json")
