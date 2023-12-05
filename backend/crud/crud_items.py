from typing import Optional
from sqlalchemy.orm import Session, joinedload
import json

from models.item import PictureLink, Item
from models.stores import Store
from models.category import Category
from utils.build_category import create_category_objects


def get_items(db: Session, id: Optional[int] =None, skip: int = 0, limit: int = 100):
    query = db.query(Item).options(
            joinedload(Item.picture_link),
            joinedload(Item.categories).joinedload(Category.pictures),
            joinedload(Item.stores),
        )
    if id is not None:
        # If an id is provided, filter the query by id
        query = query.filter(Item.id == id)
    
    return query.offset(skip).limit(limit).all()
    


def populate_tables(db: Session):
    file_path = "mock_data/merged_product.json"
    category_tree_path = "mock_data/category_tree_full.json"

    with open(file_path, "r") as file:
        data = json.load(file)

    with open(category_tree_path, "r") as file:
        category_tree = json.load(file)

    for item_data in data:
        # Build Category Hierarchy
        category_hierarchy = create_category_objects(
            item_data["category"]["category_path"], category_tree, db
        )
        # Create Item instance
        new_item = Item(
            name=item_data["name"],
            brand=item_data["brand"],
            description=item_data["description"],
            gln=item_data["gln"],
            gtin=item_data["gtin"],
            measurements_units=item_data["measurements"]["units"],
            measurements_amount=item_data["measurements"]["amount"],
            measurements_label=item_data["measurements"]["label"],
            categories=category_hierarchy if category_hierarchy else [],
        )

        # Add PictureLink instances to Item
        pictures = item_data.get("piture_links", [])
        if len(pictures) >= 3:
            new_picture_link = PictureLink(
                width=pictures[3]["width"], height=pictures[3]["height"], url=pictures[3]["url"]
            )
            new_item.picture_link = new_picture_link

        db.add(new_item)

        # Add Store instances to Item
        for store_name, store_data in item_data["stores"].items():
            price = (
                float(store_data["price"]) if store_data["price"] != "null" else None
            )
            new_store = Store(
                name=store_name,
                link=store_data["link"],
                price=price,
                discount_info=store_data.get("discount_info", []),
            )
            db.add(new_store)
            new_item.stores.append(new_store)
    db.commit()
    db.close()
    return True
