import requests
import json

DATA_URL = "https://raw.githubusercontent.com/supermarkt/checkjebon/main/data/supermarkets.json"


def use_downloaded_data():
    response = requests.get(DATA_URL)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"Failed to retrieve the data. Status code: {response.status_code}")
        return None
