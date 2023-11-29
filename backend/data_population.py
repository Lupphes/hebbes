from os import link
import json
from sqlalchemy.orm import Session
from fastapi import Depends

from utils.misc import get_db
from models.item import Item
from models.item_company import ItemCompany
from models.company import Company

def databasePopulation(db: Session = Depends(get_db)):
    file_path = "www.ah.nl/products.json"
    with open(file_path, "r") as file:
        data = json.load(file)

    for item_data in data:
        # Create Item instance
        item = Item(name=item_data.get("name"), link=item_data.get("link"), brand=item_data.get("brand"))
        db.add(item)
        db.flush()  # Flush to get the item_id

        # Create ItemCompany instance
        company = Company(name="ah")
        db.add(company)
        db.flush()
        
        # Create ItemCompany instance
        item_company = ItemCompany(item_id=item.id, company_id=company.id)
        db.add(item_company)
    db.commit()
    db.refresh()
    db.close()