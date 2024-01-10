'use client';
import type { NextPage } from 'next';
import CartRow from '@/components/CartRow';
import React, { useState, useEffect } from 'react';

const findKeyWithLowestSum = (
  adjustedSumByItemInfoKey: SumByItemInfoKey
): LowestHighest => {
  let lowestKey: string = '';
  let lowestSum: number = 0;
  let highestSum: number = 0;
  let unchanged: boolean = true;

  Object.keys(adjustedSumByItemInfoKey).forEach((key) => {
    const sum = adjustedSumByItemInfoKey[key].sum;
    if (unchanged) {
      unchanged = false;
      lowestSum = sum;
      lowestKey = key;
      highestSum = sum;
    }
    if (sum < lowestSum) {
      lowestSum = sum;
      lowestKey = key;
    }
    if (sum > highestSum) {
      highestSum = sum;
    }
  });
  const item: LowestHighest = {
    lowestKey,
    lowestSum,
    highestSum,
  };
  return item;
};

const Cart: NextPage<{
  items: Item[];
  sumByItemInfoKey: SumByItemInfoKey;
  adjustedSum: SumByItemInfoKey;
}> = ({ items, sumByItemInfoKey, adjustedSum }) => {
  const result = findKeyWithLowestSum(adjustedSum);
  const [selectedStore, setSelectedStore] = useState<string>('ah');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStore(event.target.value);
  };

  // Calculate estimated savings
  const estimatedSavings = result ? result.highestSum - result.lowestSum : 0;
  const finalTotal = items.reduce((total, item) => {
    const storePrice = item.item_info[selectedStore]
      ? item.item_info[selectedStore].price
      : item.item_info[Object.keys(item.item_info)[0]].price; // Fallback to the first available store's price
    return total + storePrice * item.cartQuantity;
  }, 0);

  return (
    <div className='mb-4 flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-5 shadow-md'>
      {/* Cards for each item */}
      {items.length > 0 ? (
        items.map((item: Item) => (
          <CartRow
            item={item}
            result={result}
            selectedStore={selectedStore}
            key={item.id}
          />
        ))
      ) : (
        <div className='text-center'>No items in cart yet...</div>
      )}

      {/* Cart totals and options */}
      <div className='w-full rounded-md bg-silver p-4 lg:w-1/4 md:w-1/2'>
        {/* Select Store */}
        <div className='mb-4 flex items-center justify-between'>
          <span>Select store:</span>
          <select
            onChange={handleSelectChange}
            className='border-gray-300 h-8 w-32 rounded border'
          >
            <option value='ah'>Albert Heijn</option>
            <option value='jmb'>Jumbo</option>
          </select>
        </div>

        {/* Est. Savings and Final Total */}
        <div className='mb-4 flex items-center justify-between'>
          <span>Est. Savings*:</span>
          <span className='text-red'>
            <span className='text-red'>€ {estimatedSavings.toFixed(2)}</span>
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Final Total**:</span>
          <span className='text-green-600'>€ {finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className='text-xs text-gray-600 mt-4 w-full'>
        <p>
          * Calculated based on the difference between the prices and the
          cheapest store selected by price bandit.
        </p>
        <p>
          ** Final total of items that are available in store specified behind
          items.
        </p>
      </div>
    </div>
  );
};

export default Cart;
