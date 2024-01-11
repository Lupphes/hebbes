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
  const finalTotalAH = items.reduce((total, item) => {
    return item.item_info['ah']
      ? total + item.item_info['ah'].price * item.cartQuantity
      : total;
  }, 0);

  const finalTotalJMB = items.reduce((total, item) => {
    return item.item_info['jmb']
      ? total + item.item_info['jmb'].price * item.cartQuantity
      : total;
  }, 0);
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
      <div className='w-full rounded-md bg-silver p-4 '>
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
          <span className='text-green-800'>€ {finalTotal.toFixed(2)}</span>
        </div>

        {/* Final Totals for AH and JMB */}
        <div className='mt-8 flex items-center justify-between'>
          <span>Final Total AH:</span>
          <span className='text-green-800'>€ {finalTotalAH.toFixed(2)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Final Total JMB:</span>
          <span className='text-green-800'>€ {finalTotalJMB.toFixed(2)}</span>
        </div>
      </div>

      {/* Price Breakdown Section with Enhanced Styling */}
      <div className='mt-4 w-full rounded-md bg-blue-100 p-4 shadow'>
        {/* Breakdown for Albert Heijn */}
        <div className='mb-4'>
          <h3 className='mb-2 text-lg font-bold text-blue-700'>
            Breakdown for Albert Heijn:
          </h3>
          {items.map(
            (item) =>
              item.item_info['ah'] && (
                <p key={item.id} className='text-sm'>
                  {item.name}:{' '}
                  <span className='text-blue-600'>
                    €{item.item_info['ah'].price.toFixed(2)}
                  </span>{' '}
                  x {item.cartQuantity} ={' '}
                  <span className='font-semibold'>
                    €
                    {(item.item_info['ah'].price * item.cartQuantity).toFixed(
                      2
                    )}
                  </span>
                </p>
              )
          )}
          <p className='font-bold text-blue-800'>
            Total: €{finalTotalAH.toFixed(2)}
          </p>
        </div>

        {/* Breakdown for Jumbo */}
        <div className='mb-4'>
          <h3 className='mb-2 text-lg font-bold text-green-700'>
            Breakdown for Jumbo:
          </h3>
          {items.map(
            (item) =>
              item.item_info['jmb'] && (
                <p key={item.id} className='text-sm'>
                  {item.name}:{' '}
                  <span className='text-green-600'>
                    €{item.item_info['jmb'].price.toFixed(2)}
                  </span>{' '}
                  x {item.cartQuantity} ={' '}
                  <span className='font-semibold'>
                    €
                    {(item.item_info['jmb'].price * item.cartQuantity).toFixed(
                      2
                    )}
                  </span>
                </p>
              )
          )}
          <p className='font-bold text-green-800'>
            Total: €{finalTotalJMB.toFixed(2)}
          </p>
        </div>

        {/* Savings Breakdown */}
        <div className='mb-4'>
          <h3 className='text-red-700 mb-2 text-lg font-bold'>
            Estimated Savings:
          </h3>
          <p>
            Savings:{' '}
            <span className='text-blue-600'>€{finalTotalAH.toFixed(2)}</span>{' '}
            (AH) -{' '}
            <span className='text-green-600'>€{finalTotalJMB.toFixed(2)}</span>{' '}
            (JMB) ={' '}
            <span className='text-red-800 font-semibold'>
              €{estimatedSavings.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      <div className='text-gray-600 mt-4 w-full text-xs'>
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
