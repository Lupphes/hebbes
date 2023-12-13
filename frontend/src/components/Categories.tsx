/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
'use client';
import groentefruit from '@/resources/groente fruit.png';
import vlees from '@/resources/Vlees.png';
import dairy from '@/resources/Daries.png';
import bakery from '@/resources/Bakery.png';
import snacks from '@/resources/Snacks.png';
import drinks from '@/resources/Drinken.png';
import Link from 'next/link';
// import img from 'next/image';
import { Fragment, MouseEventHandler, useState } from 'react';
import CategoryPanel from './CategoryPanel';

const callouts = [
  {
    name: 'Starch, vegetables and fruit',
    description: 'Fill your hungers quickly',
    imageSrc: groentefruit.src,
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Meat, chicken and vega',
    description: 'Essential proteins',
    imageSrc: vlees.src,
    imageAlt:
      'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Dairy and eggs',
    description: 'Calcium for you',
    imageSrc: dairy.src,
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Bakery',
    description: 'Delicious breads and pastries',
    imageSrc: bakery.src,
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Snacks',
    description: 'Netflix and snacks?',
    imageSrc: snacks.src,
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Drink',
    description: 'Quenching your thirst',
    imageSrc: drinks.src,
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
];

const SIDEBAR_STATUS = false;

export default function Categories() {
  const [open, setOpen] = useState(SIDEBAR_STATUS);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className=' bg-gray-100'>
      <div className='mt-6 gap-x-6 space-y-12 grid grid-cols-3 lg:gap-x-6 sm:grid-cols-1'>
        {callouts.map((callout) => (
          <div key={callout.name} className='rounded-md border-2'>
            <div className=''>
              <img
                src={callout.imageSrc}
                alt={callout.imageAlt}
                className='h-full w-full object-cover object-center'
              />
            </div>
            <h3 className='mt-6 text-sm text-gray-500'>
              <a href={callout.href}>
                {/*<span className='absolute inset-0' />*/}
                {callout.name}
              </a>
            </h3>
            <p className='text-base font-semibold text-gray-900'>
              {callout.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
