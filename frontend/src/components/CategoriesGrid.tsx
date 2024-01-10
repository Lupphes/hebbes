// components/CategoriesGrid.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleSearchCategories = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const category_id = event.currentTarget.getAttribute('data-name');
    router.push(`/shop/?category_id=${category_id}`);
  };

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4'>
        {data.data.map((category) => (
          <div
            data-name={category.id}
            key={category.id}
            className='mb-4 cursor-pointer'
            onClick={handleSearchCategories}
          >
            <img
              data-name={category.id}
              src={category.pictures[0].url}
              alt={category.name}
              className='mb-2 h-48 w-full object-cover'
            />
            <p data-name={category.id} className='text-center'>
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
