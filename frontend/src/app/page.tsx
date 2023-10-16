import Navbar from '@/components/navbar';
import Category from '@/components/category';
import Product from '@/components/product';
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
