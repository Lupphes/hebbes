from models import Category, Picture


def find_category_by_id(categories_dict, target_id):
    # Iterate over top-level categories
    for _, category in categories_dict.items():
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


def create_category_objects(ids, category_tree, db):
    if not ids:
        # If no ids provided, return an empty list
        return []
    if ids == ["Uncategorized"]:
        uncategorized_category = (
            db.query(Category).filter_by(name="Uncategorized").first()
        )
        if uncategorized_category is None:
            uncategorized_category = Category(name="Uncategorized", parent_id=None)
            db.add(uncategorized_category)
            db.commit()
        return [uncategorized_category]

    category_objects = []
    current_category = None

    for category_id in ids:
        category_data = find_category_by_id(category_tree, category_id)
        if category_data:
            category = db.query(Category).filter_by(category_id=category_id).first()
            if not category:
                # If a category with this category_id does not exist, create a new one
                category = Category(
                    category_id=category_data["id"], name=category_data["name"]
                )

                images = category_data.get("images", [])
                new_pic = None
                if len(images) >= 3:
                    pic = images[2]
                    new_pic = Picture(
                        width=pic.get("width"),
                        height=pic.get("height"),
                        url=pic.get("url"),
                    )
                elif len(images) == 1:
                    pic = images[0]
                    new_pic = Picture(
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
