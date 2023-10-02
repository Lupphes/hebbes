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
const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 6,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
];

export default function Product() {
  return (
    <div className='bg-gray-100'>
      <div className='lg:max-w-8x1 mx-auto px-4 sm:px-6'>
        <div className='mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-none lg:py-24'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Products on Sale{' '}
          </h2>

          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8'>
            {products.map((product) => {
              // Calculate the discounted price
              const price = parseFloat(product.price.slice(1)); // Remove the dollar sign and convert to number
              const discount = price * 0.15;
              const discountedPrice = (price - discount).toFixed(2);

              return (
                <a key={product.id} href={product.href} className='group'>
                  <div className='aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200'>
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className='h-full w-full object-cover object-center group-hover:opacity-75'
                    />
                  </div>
                  <h3 className='mt-4 text-sm text-gray-700'>{product.name}</h3>
                  <p className='mt-1 text-lg font-medium text-gray-900'>
                    <span className='mr-2 line-through'>{product.price}</span>
                    {`$${discountedPrice}`}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
