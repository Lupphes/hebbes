'use client';
// import Categories from '@/components/Categories';
import { useEffect } from 'react';

import catJson from '@/mock_data/cat.json';
import CategoriesGrid from '@/components/CategoriesGrid';
import { RootState } from '@/redux/store';

import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
const MainPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <main className='flex flex-col items-center justify-between p-5 font-poppins'>
      <h2 className='text-2xl text-gray-900 font-bold'>
        Welcome to Price Bandit {user?.email ? `, ${user.email}` : ''}!
      </h2>
      <h3 className='text-2xl text-gray-900 font-bold'>
        Find the best deals on your favorite products in the Netherlands.
      </h3>
      <CategoriesGrid data={catJson} />
    </main>
  );
};

export default MainPage;
