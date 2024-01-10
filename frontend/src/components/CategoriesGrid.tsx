// components/CategoriesGrid.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import CircularProgress from '@mui/material/CircularProgress';
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
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.loading);

  const handleShowCategories = () => {
    setShowCategories(true);
  };

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
      {loading ? <CircularProgress /> : null}

      {
        <div className='grid grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1'>
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
      }
    </div>
  );
};

export default CategoriesGrid;
