'use client';
import Ad from '@/components/Ad';
import Cart from '@/components/Cart';
import localStorage from 'localStorage';
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
  //const [items, setItems] = useState<Item[] | null>([]);
  //const [loading, setLoading] = useState(true);
  /*useEffect(() => {
    const fetchItems = async () => {
      try {
        const url = `http://localhost:5000/db/items?limit=5&skip=5`;
        const response = await fetch(url);
        const result = await response.json();
        setItems(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);*/

  let cartItems : Item[] = [];
  const localCart = localStorage.getItem('cart')
  if (localCart)
  {
    //localStorage.setItem('cart', JSON.stringify(cart));
    cartItems = JSON.parse(localCart);
    console.log(cartItems)
  }
  else if(!localCart)
  {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  return (
    <div className="flex flex-col items-center gap-10 w-[80%] font-poppins py-10">
      <Ad />
      {cartItems ?
        (
          <Cart items={cartItems} sumByItemInfoKey={calculateSumByItemInfoKey(cartItems)} adjustedSum={adjustSumForCommonIds(calculateSumByItemInfoKey(cartItems))} />
        ) : (
          <p>Api connection missing.</p>
        )}
      <Ad />
    </div>
  );
};

export default CartPage;