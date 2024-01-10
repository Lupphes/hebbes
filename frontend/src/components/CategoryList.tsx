// components/CategoriesList.tsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleSearchCategories = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const category_id = event.currentTarget.getAttribute('data-name');
    router.push(`/shop/?category_id=${category_id}`);
  };

  return (
    <div className='md:min-w-4/6 flex w-full flex-col items-start overflow-x-auto px-4 md:w-full md:flex-row md:items-center md:px-0'>
      <Button
        onClick={handleShowCategories}
        color='success'
        variant='outlined'
        className='mb-4 md:mb-0'
      >
        {showCategories ? 'Hide Categories' : 'Show Categories'}
      </Button>
      {showCategories && (
        <div className='flex w-full flex-wrap justify-center md:justify-start'>
          {data.data.map((category) => (
            <div
              key={category.id}
              data-name={category.id}
              className='m-2 cursor-pointer'
              onClick={handleSearchCategories}
            >
              <img
                data-name={category.id}
                src={category.pictures[0].url}
                alt={category.name}
                className='mb-2 h-24 w-24 object-cover md:h-32 md:w-32'
              />
              <div data-name={category.id} className='text-center'>
                {category.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
