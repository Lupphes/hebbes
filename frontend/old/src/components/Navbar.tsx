'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux/es/exports';
import { AppDispatch } from '@/redux/store';
import { logOut } from '@/redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';

import store from '@/redux/store';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const userNavigation = [
    { name: 'Offer', href: '#' },
    { name: 'Feed', href: '#' },
    { name: 'Activity', href: '#' },
  ];

  const handleLogout = (e: React.MouseEvent<Element, MouseEvent>) => {
    // Handle login logic here (e.g., API call to authenticate the user).
    e.preventDefault();
    try {
      dispatch(logOut());
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className='fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-gray-800 p-4 text-white'>
      <div className='flex items-center'>
        {store.getState().auth.token ? (
          <>
            <Link href='/main' className='mr-4 font-semibold'>
              Home
            </Link>
            <Link href='/explore' className='mr-4 font-semibold'>
              Explore
            </Link>
            <Link href='/offers' className='mr-4 font-semibold'>
              Offers
            </Link>
            <Link href='/about' className='mr-4 font-semibold'>
              About
            </Link>
            <button
              onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
                handleLogout(e)
              }
              className='mr-4 font-semibold'
            >
              Logout
            </button>
            <div className='flex items-center'>
              <input
                type='text'
                className='mr-4 rounded bg-gray-200 p-2'
                placeholder='Search product'
              />
            </div>
          </>
        ) : (
          <Link href='/login' className='mr-4 font-semibold'>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
