from typing import List, Optional
from sqlalchemy.orm import Session, joinedload, aliased
import json

from models import Category, Store, Item, Picture
from utils.build_category import create_category_objects


def get_items(
    db: Session,
    id: Optional[int] = None,
    category_id: Optional[int] = None,
    store_id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
) -> List[Item]:
    query = db.query(Item).options(
        joinedload(Item.picture),
        joinedload(Item.categories).joinedload(Category.pictures),
        joinedload(Item.stores),
    )

    if id is not None:
        query = query.filter(Item.id == id)

    if category_id is not None:
        category_alias = aliased(Category)
        query = query.join(category_alias, Item.categories).filter(
            category_alias.id == category_id
        )

    if store_id is not None:
        store_alias = aliased(Store)
        query = query.join(store_alias, Item.stores).filter(store_alias.id == store_id)

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

        # Add Picture instances to Item
        pictures = item_data.get("piture_links", [])
        if len(pictures) >= 3:
            new_picture_link = Picture(
                width=pictures[3]["width"],
                height=pictures[3]["height"],
                url=pictures[3]["url"],
            )
            new_item.picture = new_picture_link

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
