// components/CategoriesGrid.tsx
import React, { useState } from 'react';
import {useRouter} from "next/navigation";

interface Category {
  id: number;
  category_id: number;
  name: string;
  parent_id: number | null;
  subcategories: Category[];
  pictures: Picture[];
}

interface Picture {
  id: number;
  item_id: number | null;
  category_id: number;
  width: number;
  height: number;
  url: string;
}

interface CategoriesGridProps {
  data: {
    data: Category[];
    message: string;
    success: boolean;
  };
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ data }) => {
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
      {
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {data.data.map((category) => (
            <div name={category.id} key={category.id} className="mb-4" onClick={handleSearchCategories}>
              <img name={category.id} src={category.pictures[0].url} alt={category.name} className="w-full h-48 object-cover mb-2" />
              <p name={category.id} className="text-center">{category.name}</p>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default CategoriesGrid;
