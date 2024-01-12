import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import CartRow from '@/components/CartRow';

interface SumByItemInfoKey {
  [key: string]: { sum: number };
}

interface FinalTotals {
  AH: number;
  JMB: number;
  total: number;
  savings: number;
  savingsActual: number;
}

const Cart: NextPage<{ items: Item[] }> = ({ items }) => {
  const [selectedStores, setSelectedStores] = useState<{
    [key: number]: number;
  }>({});
  const [cartItems, setCartItems] = useState<Item[]>(items);
  const [finalTotals, setFinalTotals] = useState<FinalTotals>({
    AH: 0,
    JMB: 0,
    total: 0,
    savings: 0,
    savingsActual: 0,
  });

  useEffect(() => {
    // Initialize selectedStores based on items
    const initialStores = items.reduce((stores, item) => {
      const priceAH = item.item_info['ah']?.price;
      const priceJMB = item.item_info['jmb']?.price;

      let cheaperStoreId = 1; // Default to Albert Heijn (store ID 1)
      if (priceAH !== undefined && priceJMB !== undefined) {
        cheaperStoreId = priceAH <= priceJMB ? 1 : 2; // Choose the cheaper store
      } else if (!priceAH && priceJMB !== undefined) {
        cheaperStoreId = 2; // Choose Jumbo if AH price is not available
      }

      return { ...stores, [item.id]: cheaperStoreId };
    }, {});

    setSelectedStores(initialStores);

    // Update cartItems based on items
    setCartItems(items);

    // Update totals based on the new items and initialStores
    calculateAndUpdateTotals(items, initialStores);
  }, [items]);

  const calculateAndUpdateTotals = (items: Item[], stores: any) => {
    let totalAH = 0,
      totalJMB = 0,
      total = 0,
      totalCheapest = 0,
      totalExpensive = 0,
      totalSelected = 0;

    items.forEach((item) => {
      const priceAH = item.item_info['ah']?.price;
      const priceJMB = item.item_info['jmb']?.price;
      const selectedStoreId = stores[item.id];

      // Add to total based on selected store
      if (selectedStoreId === 1 && priceAH !== undefined) {
        totalAH += priceAH * item.cartQuantity;
        total += priceAH * item.cartQuantity;
      } else if (selectedStoreId === 2 && priceJMB !== undefined) {
        totalJMB += priceJMB * item.cartQuantity;
        total += priceJMB * item.cartQuantity;
      }

      // Calculate totals for cheapest and most expensive options
      if (priceAH !== undefined && priceJMB !== undefined) {
        totalCheapest += Math.min(priceAH, priceJMB) * item.cartQuantity;
        totalExpensive += Math.max(priceAH, priceJMB) * item.cartQuantity;
      } else if (priceAH !== undefined) {
        totalCheapest += priceAH * item.cartQuantity;
        totalExpensive += priceAH * item.cartQuantity;
      } else if (priceJMB !== undefined) {
        totalCheapest += priceJMB * item.cartQuantity;
        totalExpensive += priceJMB * item.cartQuantity;
      }

      // Total cost based on selected stores
      if (selectedStoreId === 1 && priceAH !== Infinity) {
        totalSelected += priceAH * item.cartQuantity;
      } else if (selectedStoreId === 2 && priceJMB !== Infinity) {
        totalSelected += priceJMB * item.cartQuantity;
      }
    });

    const savings = totalExpensive - totalCheapest;
    const moreExpensiveTotal = totalExpensive - totalSelected;
    const savingsActual = Math.abs(moreExpensiveTotal);
    setFinalTotals({
      AH: totalAH,
      JMB: totalJMB,
      total,
      savings,
      savingsActual,
    });
  };

  useEffect(() => {
    calculateAndUpdateTotals(cartItems, selectedStores);
  }, [cartItems, selectedStores]);

  const handleItemStoreChange = (itemId: number, storeId: number) => {
    setSelectedStores((prevStores) => {
      const newStores = { ...prevStores, [itemId]: storeId };
      calculateAndUpdateTotals(cartItems, newStores);
      return newStores;
    });
  };

  const handleItemUpdate = (updatedItem: Item) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === updatedItem.id) {
          // Ensure the quantity is not less than 1
          const safeQuantity = Math.max(updatedItem.cartQuantity, 1);
          return { ...item, cartQuantity: safeQuantity };
        }
        return item;
      });
    });
  };

  const handleItemDelete = (itemId: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);

    const localCart = localStorage.getItem('cart');
    let cartItemsInStorage: Item[] = localCart ? JSON.parse(localCart) : [];
    cartItemsInStorage = cartItemsInStorage.filter(
      (item) => item.id !== itemId
    );
    localStorage.setItem('cart', JSON.stringify(cartItemsInStorage));

    calculateAndUpdateTotals(updatedItems, selectedStores);
  };

  return (
    <div className='mb-4 flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-5 shadow-md'>
      {/* Items */}
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartRow
            key={item.id}
            item={item}
            selectedStore={selectedStores[item.id]}
            onStoreChange={handleItemStoreChange}
            onItemUpdate={handleItemUpdate}
            onItemDelete={handleItemDelete}
          />
        ))
      ) : (
        <div className='text-center'>No items in cart yet...</div>
      )}

      {/* Totals and Savings */}
      <div className='w-full rounded-md bg-silver p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <span>Est. Savings*:</span>
          <span className='text-red'>€{finalTotals.savings.toFixed(2)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Final Total**:</span>
          <span className='text-green-800'>
            €{finalTotals.total.toFixed(2)}
          </span>
        </div>
        <div className='mt-8 flex items-center justify-between'>
          <span>Final Total AH:</span>
          <span className='text-green-800'>€{finalTotals.AH.toFixed(2)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Final Total JMB:</span>
          <span className='text-green-800'>€{finalTotals.JMB.toFixed(2)}</span>
        </div>
      </div>

      {/* Price Breakdown Section with Enhanced Styling */}
      <div className='mt-4 w-full rounded-md bg-blue-100 p-4 shadow'>
        {/* Breakdown for Albert Heijn */}
        {finalTotals.AH > 0 && (
          <div className='mb-4'>
            <h3 className='mb-2 text-lg font-bold text-blue-700'>
              Breakdown for Albert Heijn:
            </h3>
            {cartItems.map((item) => {
              if (item.item_info['ah'] && selectedStores[item.id] === 1) {
                return (
                  <p key={item.id} className='text-sm'>
                    {item.name}: €{item.item_info['ah'].price.toFixed(2)} x{' '}
                    {item.cartQuantity} = €
                    {(item.item_info['ah'].price * item.cartQuantity).toFixed(
                      2
                    )}
                  </p>
                );
              }
              return null;
            })}
            <p className='font-bold text-blue-800'>
              Total: €{finalTotals.AH.toFixed(2)}
            </p>
          </div>
        )}

        {/* Breakdown for Jumbo */}
        {finalTotals.JMB > 0 && (
          <div className='mb-4'>
            <h3 className='mb-2 text-lg font-bold text-green-700'>
              Breakdown for Jumbo:
            </h3>
            {cartItems.map((item) => {
              if (item.item_info['jmb'] && selectedStores[item.id] === 2) {
                return (
                  <p key={item.id} className='text-sm'>
                    {item.name}: €{item.item_info['jmb'].price.toFixed(2)}x{' '}
                    {item.cartQuantity} = €
                    {(item.item_info['jmb'].price * item.cartQuantity).toFixed(
                      2
                    )}
                  </p>
                );
              }
              return null;
            })}
            <p className='font-bold text-green-800'>
              Total: €{finalTotals.JMB.toFixed(2)}
            </p>
          </div>
        )}

        {/* Savings Breakdown */}
        {finalTotals.JMB > 0 && (
          <div className='mb-4'>
            <h3 className='text-red-700 mb-2 text-lg font-bold'>
              Your Estimated Savings:
            </h3>
            <p>
              Cheaper by €{finalTotals.savingsActual.toFixed(2)} by shopping at
              selected stores
            </p>
          </div>
        )}

        <div className='text-gray-600 mt-4 w-full text-xs'>
          <p>
            * Calculated based on the difference between the prices and the
            cheapest store selected by Price Bandit.
          </p>
          <p>
            ** Final total of items that are available in store specified behind
            items.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
