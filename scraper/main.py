from scrapers.base_scraper import BaseScraper
from scrapers.data_downloader import use_downloaded_data
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


def main(scrape=True):
    if scrape:
        AHScraper().run()
        ALDIScraper().run()
        CoopScraper().run()
        JumboScraper().run()
        # DekaMarktScraper().run()
        # DirkScraper().run()
        # HoogvlietScraper().run()
        # JanLindersScraper().run()
        # PicnicScraper().run()
        # PlusScraper().run()
        # SPARScraper().run()
        # VomarScraper().run()
    else:
        data = use_downloaded_data()

    base_urls = [cls.BASE_URL for cls in BaseScraper.__subclasses__()]
    Unification("data", base_urls, "https://www.ah.nl/")


if __name__ == "__main__":
    print("Hello Scraper!")
    main(scrape=True)  # Set to True to scrape, False to use downloaded data
