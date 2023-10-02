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
import groentefruit from '../../resources/groente fruit.png';
import vlees from '../../resources/Vlees.png';
import dairy from '../../resources/Daries.png';
import bakery from '../../resources/Bakery.png';
import snacks from '../../resources/Snacks.png';
import drinks from '../../resources/Drinken.png';
import Link from 'next/link';

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

export default function Category() {
  return (
    <div className='bg-gray-100'>
      <div className='lg:max-w-8x1 mx-auto px-4 sm:px-6'>
        <div className='mx-auto max-w-2xl py-4 sm:py-12 lg:max-w-none lg:py-24'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Browse by category
          </h2>

          <div className='mt-6 space-y-12 lg:grid lg:grid-cols-6 lg:gap-x-6 lg:space-y-0'>
            {callouts.map((callout) => (
              <div key={callout.name} className='group relative'>
                <div className='sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64'>
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                <h3 className='mt-6 text-sm text-gray-500'>
                  <a href={callout.href}>
                    <span className='absolute inset-0' />
                    {callout.name}
                  </a>
                </h3>
                <p className='text-base font-semibold text-gray-900'>
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
          <Link href='#'>
            <div className='mt-4'>
              <h1 className='text-2xs font-bold text-gray-600'>
                More category...
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
