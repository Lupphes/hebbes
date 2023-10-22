'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const userNavigation = [
    { name: 'Offer', href: '#' },
    { name: 'Feed', href: '#' },
    { name: 'Activity', href: '#' },
  ];
  return (
    <nav className='fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-gray-800 p-4 text-white'>
      <div className='flex items-center'>
        <Link href='/' className='mr-4 font-semibold'>
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
        <Link href='/login' className='mr-4 font-semibold'>
          Login
        </Link>
      </div>
      <div className='flex items-center'>
        <input
          type='text'
          className='mr-4 rounded bg-gray-200 p-2'
          placeholder='Search product'
        />
        <Menu as='div' className='relative ml-3'>
          <div>
            <Menu.Button className='relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
              <span className='absolute -inset-1.5' />
              <span className='sr-only'>View notifications</span>
              <BellIcon className='h-6 w-6' aria-hidden='true' />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
