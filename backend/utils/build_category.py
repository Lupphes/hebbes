from models.category import Category
from models.item import PictureLink


UNCATEGORIZED_ID = 9999  # Assuming 9999 as the ID for 'Uncategorized'


def find_category_by_id(categories_dict, target_id):
    # Iterate over top-level categories
    for category_id, category in categories_dict.items():
        # Check if the current category has the target ID
        if category.get("id") == target_id:
            return category

        # Check if the current category has subcategories
        subcategories = category.get("subcategories", {})
        for subcategory_id, subcategory in subcategories.items():
            # Recursively search through subcategories
            result = find_category_by_id({subcategory_id: subcategory}, target_id)
            if result:
                return result

    # If the target ID is not found
    return None


# def create_category(cat_id, category_tree, db):
#     cat_data = find_category_by_id(category_tree, cat_id)

#     category = db.query(Category).filter_by(id=cat_id).first()
#     if category:
#         return category
#     else:
#         new_cat = Category(id=cat_data.get("id"), name=cat_data.get("name"))
#         for pic in cat_data.get("images", []):
#             new_pic = PictureLink(
#                 width=pic.get("width"), height=pic.get("height"), url=pic.get("url")
#             )
#             new_cat.pictures.append(new_pic)
#         subcategories_data = cat_data.get("subcategories", {})
#         for subcategory_id, subcategory_data in subcategories_data.items():
#             subcategory = create_category(
#                 subcategory_id, {subcategory_id: subcategory_data}, db
#             )
#             if subcategory:
#                 new_cat.subcategories.append(subcategory)
#         return new_cat


# def build_category_hierarchy_from_path(category_path, category_tree, db):
#     if not category_path:
#         # If no category path is provided, return 'Uncategorized'
#         return [create_category(UNCATEGORIZED_ID, category_tree, db)]
#     category_hierarchy = []

#     top_category = create_category(category_path[0], category_tree, db)

#     if not top_category:
#         # If the top category is not found, assign to 'Uncategorized'
#         return [create_category(UNCATEGORIZED_ID, category_tree, db)]
#     category_hierarchy.append(top_category)
#     current_category = top_category
#     for sub_cat_id in category_path[1:]:
#         sub_category = create_category(sub_cat_id, category_tree, db)
#         if sub_category:
#             current_category.subcategories.append(sub_category)
#             current_category = sub_category
#             category_hierarchy.append(current_category)
#     return category_hierarchy


def create_category_objects(ids, category_tree, db):
    if not ids:
        # If no ids provided, return an empty list
        return []

    category_objects = []
    parent_id = ids[0]
    parent_data = find_category_by_id(category_tree, parent_id)

    if not parent_data:
        # If no category data is found for the parent id, return an empty list
        return []

    parent_category = Category(id=parent_data["id"], name=parent_data["name"])

    for pic in parent_data.get("images", []):
        new_pic = PictureLink(
            width=pic.get("width"), height=pic.get("height"), url=pic.get("url")
        )
        parent_category.pictures.append(new_pic)

    category_objects.append(parent_category)
    current_category = parent_category

    for category_id in ids[1:]:
        category_data = find_category_by_id(parent_data["subcategories"], category_id)
        if category_data:
            existing_category = db.query(Category).filter_by(id=category_id).first()
            if existing_category:
                # Update existing category with new data
                continue
            else:
                category = Category(id=category_data["id"], name=category_data["name"])
                category_objects.append(category)

                if current_category is not None:
                    current_category.subcategories.append(category)

                    for pic in category_data.get("images", []):
                        new_pic = PictureLink(
                            width=pic.get("width"),
                            height=pic.get("height"),
                            url=pic.get("url"),
                        )
                        category.pictures.append(new_pic)
                    db.add(category)
                    current_category = category
                    parent_data = category_data

    return category_objects
