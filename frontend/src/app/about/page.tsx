import React from 'react';
import Navbar from '../../components/Navbar';

const AboutPage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <header className='bg-gray-800 py-6 text-center text-white'>
        <h1 className='text-3xl font-semibold'>About Us</h1>
      </header>

      <section className='py-10'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-semibold'>Who We Are</h2>
          <p className='mt-4 text-gray-700'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            convallis nunc id sagittis gravida. Phasellus ultrices tellus ut
            mauris fringilla, sed consectetur turpis feugiat. Vivamus nec
            tincidunt ante.
          </p>
        </div>
      </section>

      <section className='bg-gray-200 py-10'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-semibold'>What We Do</h2>
          <p className='mt-4 text-gray-700'>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>
      </section>

      <section className='py-10'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-semibold'>Team Members</h2>
          <div className='-mx-2 flex flex-wrap'>{/* Team member cards */}</div>
        </div>
      </section>

      <footer className='bg-gray-800 py-6 text-center text-white'>
        <p>&copy; 2022 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
