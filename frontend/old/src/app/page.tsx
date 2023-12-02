import Navbar from '@/components/Navbar';
import Category from '@/components/Category';
import Product from '@/components/Product';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Navbar />
      <h2 className='text-2xl font-bold text-gray-900'>
        Welcome to Price Bandit Project!
      </h2>
      <Category />
      <Product />
    </main>
  );
}
