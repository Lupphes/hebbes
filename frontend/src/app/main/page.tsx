'use client';
import Category from '@/components/Category';
import { redirect } from 'next/navigation';

import Product from '@/components/Product';
import { useLayoutEffect } from 'react';

const MainPage = () => {
  useLayoutEffect(() => {
    const isAuth = localStorage.getItem('access_token');
    if (!isAuth) {
      redirect('/login');
    }
  }, []);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h2 className='text-2xl font-bold text-gray-900'>
        Welcome to Price Bandit!
      </h2>
      <Category />
      <Product />
    </main>
  );
};

export default MainPage;
