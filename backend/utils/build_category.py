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
    current_category = None

    for category_id in ids:
        category_data = find_category_by_id(category_tree, category_id)
        if category_data:
            category = db.query(Category).filter_by(id_category=category_id).first()
            if not category:
                # If a category with this id_category does not exist, create a new one
                category = Category(id_category=category_data["id"], name=category_data["name"])
                print("category ", category)

                images = category_data.get("images", [])
                new_pic = None
                if len(images) >= 3:
                    pic = images[2]
                    new_pic = PictureLink(
                        width=pic.get("width"),
                        height=pic.get("height"),
                        url=pic.get("url"),
                    )
                elif len(images) == 1:
                    pic = images[0]
                    new_pic = PictureLink(
                        width=pic.get("width"),
                        height=pic.get("height"),
                        url=pic.get("url"),
                    )
                category.pictures.append(new_pic)
                db.add(category)
                db.commit()

            if current_category is not None:
                # If there is a current category, add the new category as its subcategory
                current_category.subcategories.append(category)

            category_objects.append(category)
            current_category = category

    return category_objects