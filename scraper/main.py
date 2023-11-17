from scrapers.data_unpacker import unpack
from scrapers import (
    AHScraper,
    ALDIScraper,
    CoopScraper,
    DekaMarktScraper,
    DirkScraper,
    HoogvlietScraper,
    JanLindersScraper,
    JumboScraper,
    PicnicScraper,
    PlusScraper,
    SPARScraper,
    VomarScraper,
    Unification,
)


def main(scrape=True, data_folder="./data"):
    if scrape:
        AHScraper().run()
        ALDIScraper().run()
        CoopScraper().run()
        JumboScraper().run()
        DekaMarktScraper().run()
        DirkScraper().run()
        HoogvlietScraper().run()
        JanLindersScraper().run()
        # PicnicScraper().run() # No robots.txt
        PlusScraper().run()
        SPARScraper().run()
        VomarScraper().run()
    else:
        data = unpack(data_folder=data_folder)

    uni = Unification(data_folder, "www.ah.nl")
    updated_products = uni.update_product_stores()
    uni.save_updated_products(updated_products)


if __name__ == "__main__":
    print("Hello Scraper!")
    main(
        scrape=True, data_folder="./data"
    )  # Set to True to scrape, False to use downloaded data
