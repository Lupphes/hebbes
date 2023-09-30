import requests
from bs4 import BeautifulSoup

BASE_URL = "https://example.com"  # Change this to the website you want to scrape


def fetch_page_content(url):
    """
    Fetches the content of the page using the requests library.
    """
    response = requests.get(url)

    if response.status_code == 200:
        return response.content
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return None


def scrape_content(content):
    """
    Parses the fetched content using BeautifulSoup and extracts desired data.
    """
    soup = BeautifulSoup(content, "html.parser")

    # As an example, this will fetch all the paragraphs from the page
    paragraphs = soup.find_all("p")
    for p in paragraphs:
        print(p.get_text())


def main():
    content = fetch_page_content(BASE_URL)
    if content:
        scrape_content(content)


if __name__ == "__main__":
    print("Hello Scraper!")
    main()
