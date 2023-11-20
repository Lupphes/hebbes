from selenium import webdriver


def fetch_and_print_title(url, driver):
    driver.get(url)
    print(driver.title)


# Mimic a Firefox User-Agent
firefox_user_agent = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0"
)

# Set Chrome options
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument(f"user-agent={firefox_user_agent}")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option("useAutomationExtension", False)

# Disable images and JavaScript
prefs = {
    "profile.managed_default_content_settings.images": 2,
    "profile.default_content_setting_values.javascript": 2,
    "profile.default_content_setting_values.stylesheets": 2,
}
chrome_options.add_experimental_option("prefs", prefs)

# Initialize Chrome driver with options
driver = webdriver.Chrome(options=chrome_options)

# Define URLs
url1 = "https://www.ah.nl/producten/product/wi73/ah-franse-baguettes"
url2 = "https://www.ah.nl/producten/ontbijtgranen-en-beleg/zoet-broodbeleg/hazelnoot-en-chocoladepasta/hazelnootpasta"

# Fetch and print titles
for _ in range(3):  # Loop 3 times
    fetch_and_print_title(url1, driver)
    fetch_and_print_title(url2, driver)

# Close the browser window
driver.quit()
