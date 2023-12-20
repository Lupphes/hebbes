import json
from typing import List, Optional

from sqlalchemy.orm import Session, joinedload, aliased
from sqlalchemy import func
from sqlalchemy_searchable import search

from models import Category, Store, Item, Picture, ItemInfo
from utils.build_category import create_category_objects


from schemas import (
    ItemInfoSchema,
    ItemSchema,
    PictureSchema,
    CategorySchema,
    ResponseSchema,
)


def get_items(
    db: Session,
    query: Optional[str] = None,
    id: Optional[List[int]] = None,
    category_id: Optional[List[int]] = None,
    store_id: Optional[List[int]] = None,
    skip: int = 0,
    limit: int = 100,
) -> ResponseSchema:
    """
    Retrieves items from the database with optional filters for id, category_id, store_id, and a search query.
    The function supports pagination and full-text search.

    Args:
        db (Session): Database session.
        query (str, optional): Full-text search query.
        id (List[int], optional): List of item IDs to filter.
        category_id (List[int], optional): List of category IDs to filter.
        store_id (List[int], optional): List of store IDs to filter.
        skip (int): Number of items to skip for pagination.
        limit (int): Maximum number of items to return.

    Returns:
        ResponseSchema: Response containing the list of items or an error message.
    """
    try:
        if skip < 0 or limit < 1:
            raise ValueError(
                "Skip must be a non-negative integer and limit must be a positive integer."
            )

        for identifier_list in [id, category_id, store_id]:
            if identifier_list is not None and any(i < 0 for i in identifier_list):
                raise ValueError("ID lists must only contain positive integers.")
    except ValueError as e:
        return ResponseSchema.error_response(message=str(e))

    query_object = db.query(Item).options(
        joinedload(Item.picture),
        joinedload(Item.categories).joinedload(Category.pictures),
        joinedload(Item.item_infos),
        joinedload(Item.stores),
    )

    # Full-text search
    if query:
        query_object = search(query_object, query, sort=True)

    # Filtering by item IDs
    if id:
        query_object = query_object.filter(Item.id.in_(id))

    # Filtering by category IDs
    if category_id:
        category_alias = aliased(Category)
        query_object = query_object.join(category_alias, Item.categories).filter(
            category_alias.id.in_(category_id)
        )

    if store_id:
        # Create a subquery for each store ID
        for sid in store_id:
            store_alias = aliased(Store)
            query_object = query_object.join(store_alias, Item.stores).filter(
                store_alias.id == sid
            )

    try:
        items = query_object.offset(skip).limit(limit).all()

        formatted_items = format_item_response(items, db)
    except Exception as e:
        return ResponseSchema.error_response(
            data=[], message=f"Could not format the data: {e}"
        )

    if not items:
        return ResponseSchema.success_response(data=[], message="No items found.")

    validated_items = [ItemSchema.model_validate(item) for item in formatted_items]
    return ResponseSchema.success_response(
        data=validated_items, message="Items retrieved successfully."
    )


def populate_tables(db: Session):
    """
    Populates the database with initial seed data from JSON files.
    This function reads items and their associated categories and stores from JSON files and
    creates corresponding database entries.

    Args:
        db (Session): Database session.

    Returns:
        bool: True if the operation is successful, False otherwise.
    """
    file_path = "mock_data/merged_products.json"
    category_tree_path = "mock_data/category_tree_full.json"

    with open(file_path, "r") as file:
        data = json.load(file)

    with open(category_tree_path, "r") as file:
        category_tree = json.load(file)

    for item_data in data:
        # Check if 'category_path' is present and not None
        if (
            "category_path" in item_data["category"]
            and item_data["category"]["category_path"] is not None
        ):
            # If 'category_path' exists, use it to build the category hierarchy
            category_hierarchy = create_category_objects(
                item_data["category"]["category_path"], category_tree, db
            )
        else:
            # If 'category_path' does not exist, assign to 'Uncategorized' category
            category_hierarchy = create_category_objects(
                ["Uncategorized"], category_tree, db
            )

        # Create Item instance
        new_item = Item(
            name=item_data["name"][:255],
            brand=item_data["brand"][:50],
            description=item_data["description"],
            gln=item_data["gln"],
            gtin=item_data["gtin"],
            measurements_units=item_data["measurements"]["units"],
            measurements_amount=item_data["measurements"]["amount"],
            measurements_label=item_data["measurements"]["label"],
            categories=category_hierarchy if category_hierarchy else [],

            search_vector=func.to_tsvector(
                "dutch", item_data["name"] + " " + item_data["brand"]
            ),
        )

        # Add Picture instances to Item
        pictures = item_data.get("picture_links", [])
        if pictures:
            last_picture = pictures[-1]
            new_picture_link = Picture(
                width=last_picture["width"],
                height=last_picture["height"],
                url=last_picture["url"],
            )
            new_item.picture = new_picture_link

        db.add(new_item)

        # Add Store instances to Item
        for store_name, store_data in item_data["stores"].items():
            try:
                if store_data["price"] is not None and store_data["price"] != "null":
                    price = float(store_data["price"])
                else:
                    price = None
            except ValueError:
                price = None

            store = db.query(Store).filter_by(name=store_name).first()
            if store is None:
                store = Store(
                    name=store_name,
                )
            db.add(store)
            db.flush()
            new_item.stores.append(store)
            new_item_info = ItemInfo(
                store_id=store.id,
                product_link=store_data["link"],
                price=price,
                discount_info=store_data.get("discount_info", []),
            )
            db.add(new_item_info)
            new_item.item_infos.append(new_item_info)
    db.commit()
    db.close()
    return True


def format_item_response(items: List[Item], db: Session) -> List[ItemSchema]:
    """
    Formats a list of Item objects into a structured response schema.

    This function converts raw database item data into a structured format
    that includes additional details such as pictures, categories, and store information.

    Args:
        items (List[Item]): List of item objects from the database.
        db (Session): Database session.

    Returns:
        List[ItemSchema]: List of formatted item data suitable for API responses.
    """
    items_response = []
    for item in items:
        # Create item_info_dict for each store's details
        item_info_dict = {}
        for info in item.item_infos:
            store = db.query(Store).filter(Store.id == info.store_id).first()
            store_name = store.name if store else "Unknown Store"
            item_info_dict[store_name] = ItemInfoSchema(
                id=info.id,
                item_id=info.item_id,
                store_id=info.store_id,
                product_link=info.product_link,
                price=info.price,
                discount_info=info.discount_info,
            )

        # Create picture schema
        if item.picture:
            picture_schema = PictureSchema(
                id=item.picture.id,
                item_id=item.picture.item_id,
                category_id=item.picture.category_id,
                width=item.picture.width
                if item.picture and item.picture.width is not None
                else 0,
                height=item.picture.height
                if item.picture and item.picture.height is not None
                else 0,
                url=item.picture.url
                if item.picture and isinstance(item.picture.url, str)
                else "",
            )
        else:
            picture_schema = PictureSchema(
                id=None, item_id=None, category_id=None, width=0, height=0, url=""
            )

        # Create category schemas
        category_schemas = (
            [
                CategorySchema(
                    id=cat.id,
                    category_id=cat.category_id,
                    name=cat.name,
                    parent_id=cat.parent_id,
                    pictures=[
                        PictureSchema(
                            id=picture.id,
                            item_id=picture.item_id,
                            category_id=picture.category_id,
                            width=picture.width,
                            height=picture.height,
                            url=picture.url,
                        )
                        for picture in cat.pictures
                    ],
                )
                for cat in item.categories
            ]
            if item.categories
            else []
        )

        # Assemble final item schema
        item_schema = ItemSchema(
            id=item.id,
            name=item.name,
            brand=item.brand,
            description=item.description,
            gln=item.gln,
            gtin=item.gtin,
            measurements_units=item.measurements_units,
            measurements_amount=item.measurements_amount,
            measurements_label=item.measurements_label,
            picture_link=picture_schema,
            categories=category_schemas,
            item_info=item_info_dict,
        )
        items_response.append(item_schema)

    return items_response
