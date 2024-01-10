import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AH from '@/resources/AH.jpg';
import JMB from '@/resources/JMB.jpg';
import { StaticImageData } from 'next/image';

const storeIcons = {
  ah: AH,
  jmb: JMB,
};

interface StoreIcons {
  [key: string]: StaticImageData;
}

const getStoreFullName = (storeId: string) => {
  const storeNames: Record<string, string> = {
    ah: 'Albert Heijn',
    jmb: 'Jumbo',
  };
  return storeNames[storeId] || 'Unknown Store';
};

const findCheapestStore = (itemInfo: any) => {
  let cheapestPrice = Infinity;
  let cheapestStore = '';
  for (const storeId in itemInfo) {
    if (itemInfo[storeId].price < cheapestPrice) {
      cheapestPrice = itemInfo[storeId].price;
      cheapestStore = storeId;
    }
  }
  return { cheapestStore, cheapestPrice };
};

const ProductRow = ({ item }: { item: Item }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

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

  const ClickAbleAddToCart = (item: Item) => {
    let localCart = localStorage.getItem('cart');
    let localCartItems = localCart ? JSON.parse(localCart) : [];
    const existingItemIndex = localCartItems.findIndex(
      (cartItem: Item) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      localCartItems[existingItemIndex].cartQuantity += 1;
    } else {
      item.cartQuantity = 1;
      localCartItems.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(localCartItems));
    setCartItems(localCartItems);
  };

  const { cheapestStore, cheapestPrice } = findCheapestStore(item.item_info);
  const storeImageSrc =
    (storeIcons as Record<string, StaticImageData>)[cheapestStore]?.src ||
    '/default-store-image.png';

  const availableStoreIcons = Object.keys(item.item_info).map((storeId) => (
    <img
      key={storeId}
      src={
        (storeIcons as StoreIcons)[storeId]?.src || '/default-store-icon.png'
      }
      alt={storeId}
      style={{ width: '20px', height: '20px', margin: '5px' }}
    />
  ));

  return (
    <div
      className='flex w-full flex-row items-center justify-between space-x-1 rounded-lg bg-white p-2 shadow-md md:p-4'
      onClick={() => ClickableProductRow(item.id)}
    >
      <div className='flex-shrink-0'>
        <img
          className='sm:w-78 sm:h-78 h-24 w-24 cursor-pointer'
          alt=''
          src={item.picture_link ? item.picture_link.url : '/'}
        />
      </div>
      <div className='ml-4 flex flex-grow flex-col'>
        <span className='text-lg font-semibold'>{item.name}</span>
        <div className='mt-2 flex items-center'>
          <img
            src={storeImageSrc}
            alt={cheapestStore}
            style={{ width: '20px', height: '20px' }}
          />
          <span className='ml-2 text-sm'>
            Cheapest at {getStoreFullName(cheapestStore)}: €{cheapestPrice}
          </span>
        </div>
        <div className='text-gray-600 mt-1 flex items-center text-sm'>
          Available at: {availableStoreIcons}
        </div>
      </div>
      <div className='mt-4 md:mt-0'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            ClickAbleAddToCart(item);
          }}
          className='rounded bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-900'
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
