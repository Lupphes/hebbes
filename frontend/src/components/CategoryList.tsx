// components/CategoriesList.tsx
import React, { useState } from 'react';
import {
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface CategoryItem {
  id: number;
  category_id: number;
  name: string;
  parent_id: number | null;
  subcategories: CategoryItem[];
  pictures: PictureCategory[];
}

interface PictureCategory {
  id: number;
  item_id: number | null;
  category_id: number;
  width: number;
  height: number;
  url: string;
}

interface CategoriesListProps {
  data: {
    data: CategoryItem[];
    message: string;
    success: boolean;
  };
}

const CategoriesList: React.FC<CategoriesListProps> = ({ data }) => {
  const [showCategories, setShowCategories] = useState(false);

  const handleShowCategories = () => {
    setShowCategories(true);
  };

  const router = useRouter();

  const handleSearchCategories = (event) => {
    event.preventDefault();
    const category_id = event.target.name;
    router.push(`/shop/?category_id=${category_id}`);
  }

  return (
    <div>
      <Button onClick={handleShowCategories}
              className=""
              color="success"
              variant="outlined">
        Show Categories
      </Button>
      {showCategories && (
        <div className="flex overflow-x-auto">
          {data.data.map((category) => (
            <div name={category.id} className="mx-4" onClick={handleSearchCategories}>
              <img name={category.id} src={category.pictures[0].url} alt={category.name} className="w-32 h-32 object-cover mb-2" />
              <a name={category.id} className="text-center w-full">{category.name}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
