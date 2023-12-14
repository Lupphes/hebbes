// components/CategoriesList.tsx
import React, { useState } from 'react';
import {
  Button,
} from "@mui/material";

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
            <div key={category.id} className="mx-4">
              <img src={category.pictures[0].url} alt={category.name} className="w-32 h-32 object-cover mb-2" />
              <p className="text-center">{category.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
