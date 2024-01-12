import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

interface CartRowProps {
  item: Item;
  selectedStore: number;
  onStoreChange: (itemId: number, storeId: number) => void;
  onItemUpdate: (updatedItem: Item) => void; // new prop
  onItemDelete?: (itemId: number) => void;
}

function findAveragePrice(itemInfo: { [key: string]: ItemInfo }): number {
  const keys = Object.keys(itemInfo);
  let sum = 0;
  let count = 0;
  for (const key of keys) {
    if (itemInfo[key] && typeof itemInfo[key].price === 'number') {
      sum += itemInfo[key].price;
      count++;
    }
  }
  return count === 0 ? 0 : sum / count;
}

const CartRow: FC<CartRowProps> = ({
  item,
  selectedStore,
  onStoreChange,
  onItemUpdate,
  onItemDelete,
}) => {
  const router = useRouter();
  const [cartItem, setCartItem] = useState<Item>(item);

  useEffect(() => {
    const localCart = localStorage.getItem('cart');
    const cartItems = localCart ? JSON.parse(localCart) : [];
    const foundItem = cartItems.find((ci: Item) => ci.id === item.id);
    setCartItem(foundItem || item);
  }, [item]);

  useEffect(() => {
    setCartItem(item);
  }, [item]);

  const handleStoreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStoreId = parseInt(event.target.value);
    onStoreChange(item.id, newStoreId);
    const updatedItem = { ...item, selectedStore: newStoreId };
    onItemUpdate(updatedItem);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(event.target.value)); // Ensure quantity is at least 1
    const updatedItem = { ...item, cartQuantity: newQuantity };
    onItemUpdate(updatedItem);

    // Update the item in local storage
    const localCart = localStorage.getItem('cart');
    let cartItemsInStorage: Item[] = localCart ? JSON.parse(localCart) : [];
    cartItemsInStorage = cartItemsInStorage.map((ci) =>
      ci.id === item.id ? { ...ci, cartQuantity: newQuantity } : ci
    );
    localStorage.setItem('cart', JSON.stringify(cartItemsInStorage));
  };

  const handleDelete = () => {
    if (onItemDelete) {
      onItemDelete(item.id);
    }
  };

  const formatPrice = (price: number | undefined) => {
    return price ? price.toFixed(2) : '0.00';
  };

  const subtotal = (price: number, quantity: number) => {
    return formatPrice(price * quantity);
  };

  const availableStores = Object.keys(item.item_info);
  const storeKey = selectedStore === 1 ? 'ah' : 'jmb';
  const price = item.item_info[storeKey]?.price;

  return (
    <div className='flex w-full flex-row items-center justify-between space-x-1 rounded-lg bg-white p-2 shadow-md md:p-4'>
      <div onClick={() => router.push(`/single-product?id=${item.id}`)}>
        <img
          src={cartItem.picture_link?.url || '/default-image.jpg'}
          alt={cartItem.name}
          className='mr-4 h-24 w-24 rounded-md'
        />
        <div className='text-black'>{cartItem.name}</div>
      </div>

      <select
        value={selectedStore}
        onChange={handleStoreChange}
        className='border-gray-300 h-8 rounded border p-1'
      >
        {availableStores.map((store) => (
          <option key={store} value={store === 'ah' ? 1 : 2}>
            {store === 'ah' ? 'Albert Heijn' : 'Jumbo'}
          </option>
        ))}
      </select>

      <div className='text-black'>€ {formatPrice(price)}</div>

      <div className='text-gray'>
        €{formatPrice(findAveragePrice(cartItem.item_info))}
      </div>

      <input
        className='box-border h-8 w-12 justify-center rounded-md border-[1px] border-solid border-darkgray bg-transparent text-base'
        type='number'
        value={cartItem.cartQuantity}
        onChange={handleQuantityChange}
      />

      <div className='text-black'>
        €{formatPrice(price * cartItem.cartQuantity)}
      </div>

      {/* Delete Button */}
      <div onClick={handleDelete} className='cursor-pointer'>
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
