'use client';
import Categories from '@/components/Categories';

const MainPage = () => {

  return (
    <main className='flex flex-col items-center justify-between p-5 font-poppins'>
      <h2 className='text-2xl font-bold text-gray-900'>
        Welcome to Price Bandit!
      </h2>
      <h3 className='text-2xl font-bold text-gray-900'>
        Find the best deals on your favorite products in the Netherlands.
      </h3>
      <Categories />
    </main>
  );
};

export default MainPage;
