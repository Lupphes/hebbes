import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AH from '@/resources/AH.jpg';
import JMB from '@/resources/JMB.jpg';

interface CartRowProps {
  item: Item;
  result: any;
  selectedStore: string;
}

const findAveragePrice = (itemInfo: { [key: string]: ItemInfo }): number => {
  const keys = Object.keys(itemInfo);
  if (keys.length === 0) {
    return 0;
  }
  let sum = 0;
  let count = 0;
  for (const key of keys) {
    if (itemInfo[key] && typeof itemInfo[key].price === 'number') {
      sum += itemInfo[key].price;
      count++;
    }
  }
  return count === 0 ? 0 : sum / count;
};

const CartRow: FC<CartRowProps> = ({ item, result, selectedStore }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Item[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      } else {
        localStorage.setItem('cart', JSON.stringify([]));
        setCartItems([]);
      }
    }
  }, []);

  const ClickableProductRow = (itemId: number) => {
    router.push(`/single-product?id=${itemId}`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9]/g, '');
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (
      newValue &&
      existingItemIndex !== -1 &&
      parseInt(newValue) !== cartItems[existingItemIndex].cartQuantity
    ) {
      cartItems[existingItemIndex].cartQuantity = parseInt(newValue);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      window.location.reload();
    }
  };

  const ClickAbleRemoveCartItem = (item: Item) => {
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      window.location.reload();
    }
  };

  const keysArray = Object.keys(item.item_info);
  const selectedStoreInfo = item.item_info[selectedStore];
  const storeToUse = selectedStoreInfo ? selectedStore : keysArray[0];
  const storeImageSrc =
    item.item_info[storeToUse]?.store_id === 1
      ? AH.src
      : item.item_info[storeToUse]?.store_id === 2
      ? JMB.src
      : '/'; // default image if none available

  return (
    <div className='flex w-full flex-row items-center justify-between space-x-1 rounded-lg bg-white p-2 shadow-md md:p-4'>
      {/* Product Image and Name */}
      <div onClick={() => ClickableProductRow(item.id)}>
        <img
          className='mr-4 h-24 w-24 rounded-md sm:h-20 sm:w-20'
          alt={item.name}
          src={item.picture_link ? item.picture_link.url : '/'}
        />
        <div className='text-black'>{item.name}</div>
      </div>

      {/* Store */}
      <div>
        <img className='h-10 w-12 rounded-md' alt='Store' src={storeImageSrc} />
      </div>

      {/* Price */}
      <div className='text-black'>€ {item.item_info[storeToUse]?.price}</div>

      {/* Average Price */}
      <div className='text-gray'>
        € {Math.round(findAveragePrice(item.item_info) * 100) / 100}
      </div>

      {/* Quantity */}
      <input
        className='box-border h-8 w-8 justify-center rounded-md border-[1px] border-solid border-darkgray bg-transparent text-base'
        placeholder={item.cartQuantity.toString()}
        type='text'
        pattern='[0-9]*'
        onBlur={handleInputChange}
      />

      {/* Subtotal */}
      <div className='text-black'>
        € {item.item_info[storeToUse]?.price * item.cartQuantity}
      </div>

      {/* Delete Button */}
      <div
        onClick={() => ClickAbleRemoveCartItem(item)}
        className='cursor-pointer'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='green'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
          />
        </svg>
      </div>
    </div>
  );
};

export default CartRow;
