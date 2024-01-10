import StoreListing from '@/components/StoreListing';
import type { NextPage } from 'next';
import QuantityAdjuster from '../components/QuantityAdjuster';
import AH from '@/resources/AH.jpg';
import JMB from '@/resources/JMB.jpg';
import React, { useState, useEffect } from 'react';

const findIndexOfCheapestStore = (stores: {
  [key: string]: ItemInfo;
}): string => {
  const keys = Object.keys(stores);
  if (keys.length === 0) {
    return ''; // Return null if the object is empty
  }
  let lowestKey = keys[0];
  for (let i = 1; i < keys.length; i++) {
    const lowestPrice = stores[lowestKey].price;
    const currentPrice = stores[keys[i]].price;
    if (
      lowestPrice === null ||
      (currentPrice !== null && currentPrice < lowestPrice)
    ) {
      lowestKey = keys[i];
    }
  }
  return lowestKey;
};

const findAveragePrice = (stores: { [key: string]: ItemInfo }): number => {
  const keys = Object.keys(stores);
  if (keys.length === 0) {
    return 0; // or throw an error, depending on your use case
  }
  let sum = 0;
  for (let i = 0; i < keys.length; i++) {
    sum = stores[keys[i]].price + sum;
  }
  // Calculate the average
  const average = sum / keys.length;
  return average;
};

const SingleProduct: NextPage<{ item: Item }> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const cheapestIndex = findIndexOfCheapestStore(item.item_info);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const ClickAbleBasket = (item: Item, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Item already in cart, increase quantity
      cartItems[existingItemIndex].cartQuantity += quantity;
    } else {
      // Item not in cart, add it
      item.cartQuantity = quantity;
      cartItems.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const [cartItems, setCartItems] = useState<Item[]>([]);
  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      } else {
        // Initialize cartItems if not found in localStorage
        localStorage.setItem('cart', JSON.stringify([]));
        setCartItems([]);
      }
    }
  }, []);

  return item && item.picture_link ? (
    <div className='my-5 flex w-full flex-col items-center justify-start gap-4 px-4 sm:flex-row'>
      {/* Image div */}
      <div className='w-full max-w-xs flex-shrink-0'>
        <img
          className='h-auto w-full rounded-3xs object-cover'
          alt={item.name}
          src={item.picture_link.url}
        />
      </div>

      {/* Content of the product */}
      <div className='flex w-full flex-col gap-4'>
        {/* Product name */}
        <div className='flex flex-col'>
          <span className='md:text-2xl text-xl font-semibold'>
            {item && item.name}
          </span>
          <span className='text-md md:text-md'>{item && item.brand}</span>
          <div>Category: {item.categories && item.categories[0].name}</div>
        </div>

        {/* Product price overview */}
        <div className='flex flex-row items-start justify-center gap-2 md:justify-start '>
          {/* Average price */}
          <div className='text-lg font-medium md:text-xl'>
            <span>€ {item.item_info && findAveragePrice(item.item_info)}</span>
          </div>
          <div className='font-medium text-green-600'>Avg. Price</div>
        </div>
        {/* Best price */}
        <div className='flex flex-row items-center justify-center gap-2 md:justify-start'>
          <div className='text-lg font-medium md:text-xl'>
            <span>
              €{' '}
              {item.item_info &&
                item.item_info[findIndexOfCheapestStore(item.item_info)].price}
            </span>
          </div>
          <div className='font-medium text-green-600'>Best Price</div>
          <img
            className='h-8 w-8 object-cover'
            alt='Store logo'
            src={item.item_info[cheapestIndex].store_id == 1 ? AH.src : JMB.src}
          />
        </div>

        {/* Suggested Stores */}
        <StoreListing item={item} />

        <div className='flex gap-5'>
          {/* Quantity adjuster */}
          <QuantityAdjuster
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />

          {/* Add to Cart Button */}
          <button
            onClick={() => ClickAbleBasket(item, quantity)}
            className='mt-4 rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50'
          >
            Add to Cart
          </button>
        </div>

        {/* Description */}
        <div className='text-gray-700 flex flex-col overflow-hidden text-sm md:text-base'>
          <div>Description: {item.description}</div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default SingleProduct;
