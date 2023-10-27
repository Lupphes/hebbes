import logging
import requests
from http.client import HTTPConnection

# Enable HTTPConnection debug logging
HTTPConnection.debuglevel = 1

logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
requests_log = logging.getLogger("requests.packages.urllib3")
requests_log.setLevel(logging.DEBUG)
requests_log.propagate = True

headers = {
    "User-Agent": "Wget/1.21.4",
    "Accept": "*/*",
    "Accept-Encoding": "identity",
}

url = "https://www.jumbo.com/dam/jumbo/sitemaps-non-aem/sitemap_product_detailpages.xml"

response = requests.get(url, headers=headers, timeout=10)

# You can then print the response to see the content or status, etc.
print(response.status_code)
print(response.text)
