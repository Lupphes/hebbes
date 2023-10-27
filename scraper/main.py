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
)


def main(scrape=True):
    if scrape:
        AHScraper()
        ALDIScraper()
        # CoopScraper()
        # DekaMarktScraper()
        # DirkScraper()
        # HoogvlietScraper()
        # JanLindersScraper()
        JumboScraper()
        # PicnicScraper()
        # PlusScraper()
        # SPARScraper()
        # VomarScraper()
    else:
        data = use_downloaded_data()


if __name__ == "__main__":
    print("Hello Scraper!")
    main(scrape=True)  # Set to True to scrape, False to use downloaded data
