'use client';
import Ad from '@/components/Ad';
import Cart from '@/components/Cart';

import React, { useState, useEffect } from 'react';

const calculateSumByItemInfoKey = (items: Item[]): SumByItemInfoKey => {
  const sumByItemInfoKey: SumByItemInfoKey = {};
  if (items) {
    items.forEach((item) => {
      const itemInfoKeys = Object.keys(item.item_info);
      itemInfoKeys.forEach((key) => {
        if (!sumByItemInfoKey[key]) {
          sumByItemInfoKey[key] = {
            sum: 0,
            itemIdPricesList: [],
          };
        }
        sumByItemInfoKey[key].sum += item.item_info[key].price;
        sumByItemInfoKey[key].itemIdPricesList.push([item.id, item.item_info[key].price]);
      });
    });
  }
  return sumByItemInfoKey;
};

const adjustSumForCommonIds = (sumByItemInfoKey: SumByItemInfoKey): SumByItemInfoKey => {
  // Calculate the common item IDs
  const commonItemIds = Object.keys(sumByItemInfoKey)
    .map((key) => sumByItemInfoKey[key].itemIdPricesList.map(([id]) => id))
    .reduce((commonIds, ids) => (commonIds ? commonIds.filter((id) => ids.includes(id)) : ids), []);

  // Adjust the sum for each key considering only common item IDs
  const adjustedSumByItemInfoKey: SumByItemInfoKey = {};
  Object.keys(sumByItemInfoKey).forEach((key) => {
    adjustedSumByItemInfoKey[key] = {
      sum: sumByItemInfoKey[key].itemIdPricesList
        .filter(([id]) => commonItemIds.includes(id))
        .reduce((total, [, price]) => total + price, 0),
      itemIdPricesList: sumByItemInfoKey[key].itemIdPricesList.filter(([id]) =>
        commonItemIds.includes(id)
      ),
    };
  });

  return adjustedSumByItemInfoKey;
};

const CartPage = () => {
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

  const ClickAbleRemoveCartItem = (item: Item) => {
    const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log()
  };

  return (
    <div className="flex flex-col items-center gap-10 w-[80%] font-poppins py-10">
      <Ad />
      {cartItems ?
        (
          <Cart 
          items={cartItems} 
          sumByItemInfoKey={calculateSumByItemInfoKey(cartItems)} 
          adjustedSum={adjustSumForCommonIds(calculateSumByItemInfoKey(cartItems))} />
        ) : (
          <tr>
            <td>
              Api connection missing.
            </td>
          </tr>
        )}
      <Ad />
    </div>
  );
};

export default CartPage;