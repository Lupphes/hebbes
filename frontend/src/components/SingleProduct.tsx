import StoreListing from '@/components/StoreListing';
import type { NextPage } from "next";
import React, { useState } from 'react';
import QuantityAdjuster from '../components/QuantityAdjuster';
import AH from "@/resources/AH.jpg";
import JMB from "@/resources/JMB.jpg";

const findIndexOfCheapestStore = (stores: { [key: string]: ItemInfo }): string => {
  const keys = Object.keys(stores);
  if (keys.length === 0) {
    return ''; // Return null if the object is empty
  }
  let lowestKey = keys[0];
  for (let i = 1; i < keys.length; i++) {
    const lowestPrice = stores[lowestKey].price;
    const currentPrice = stores[keys[i]].price;
    if (lowestPrice === null || (currentPrice !== null && currentPrice < lowestPrice)) {
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
  };
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

  const ClickAbleBasket = (item: Item, quantity : number) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
  
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

  let cartItems : Item[] = [];
  if (typeof window !== 'undefined') {
  const localCart = localStorage.getItem('cart')
    if (localCart)
    {
      //localStorage.setItem('cart', JSON.stringify(cart));
      cartItems = JSON.parse(localCart);
    }
    else if(!localCart)
    {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  };

  return (
    item && item.picture_link ? (
    <div className="overflow-hidden shrink-0 text-left text-base text-black font-poppins my-5">
      <div className="flex flex-row items-start justify-start md:flex-col md:items-center gap-8 w-[95%]">
        {/*Image div that is on the left of the rest*/}
        <div className="items-left justify-start">
          <img
            className="object-cover bg-darkolivegreen-300 rounded-3xs"
            alt=""
            src= {item.picture_link.url}
          />{/*singleProduct.imageSrc*/}
        </div>
        {/*concent of the product*/}
        <div className="flex flex-col gap-8">
          {/*product name*/}
          <div className="text-23xl inline-block ">
            {item.name}
          </div>
          {/*product price overview*/}
          <div className="flex flex-row items-center justify-between">
            {/*best price*/}
            <div className="flex flex-row items-start gap-[5px]">
              <div className="font-medium inline-block ">
                € {item.item_info && item.item_info[findIndexOfCheapestStore(item.item_info)].price}
              </div>
              <div className="font-medium text-darkolivegreen-100 inline-block">
                Best Price
              </div>
              <img
                className="w-8 h-8 object-cover"
                alt=""
                src={item.item_info[cheapestIndex].store_id == 1 ? AH.src : JMB.src}
              />{/*item.item_infos[indexOfCheapest].store_id TODO: should be picture of shop*/}
            </div>
            {/*average price*/}
            <div className="flex flex-row items-end gap-[5px]">
              <div className="font-medium inline-block ">
                <div>
                  {item && item.brand}
                </div>
                € {item.item_info && findAveragePrice(item.item_info)}
              </div>
              <div className="font-medium text-darkolivegreen-100 inline-block">
                Avg. Price
              </div>
            </div>
          </div>
          {/*Suggested Stores*/}
          <StoreListing item={item} />
          {/*quantity*/}
          <QuantityAdjuster quantity={quantity} onQuantityChange={handleQuantityChange} />

          <svg onClick={() => ClickAbleBasket(item, quantity)} className="w-6 h-6 text-darkolivegreen-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m17.855 11.273 2.105-7a.952.952 0 0 0-.173-.876 1.042 1.042 0 0 0-.37-.293 1.098 1.098 0 0 0-.47-.104H5.021L4.395.745a.998.998 0 0 0-.376-.537A1.089 1.089 0 0 0 3.377 0H1.053C.773 0 .506.105.308.293A.975.975 0 0 0 0 1c0 .265.11.52.308.707.198.187.465.293.745.293h1.513l.632 2.254v.02l2.105 6.999.785 2.985a3.13 3.13 0 0 0-1.296 1.008 2.87 2.87 0 0 0-.257 3.06c.251.484.636.895 1.112 1.19a3.295 3.295 0 0 0 3.228.12c.5-.258.918-.639 1.208-1.103.29-.465.444-.995.443-1.535a2.834 2.834 0 0 0-.194-1h2.493a2.84 2.84 0 0 0-.194 1c0 .593.186 1.173.533 1.666.347.494.84.878 1.417 1.105a3.314 3.314 0 0 0 1.824.17 3.213 3.213 0 0 0 1.617-.82 2.95 2.95 0 0 0 .864-1.536 2.86 2.86 0 0 0-.18-1.733 3.038 3.038 0 0 0-1.162-1.346 3.278 3.278 0 0 0-1.755-.506h-7.6l-.526-2h9.179c.229 0 .452-.07.634-.201a1 1 0 0 0 .379-.524Zm-2.066 4.725a1.1 1.1 0 0 1 .585.168c.173.11.308.267.388.45.08.182.1.383.06.577a.985.985 0 0 1-.288.512 1.07 1.07 0 0 1-.54.274 1.104 1.104 0 0 1-.608-.057 1.043 1.043 0 0 1-.472-.369.965.965 0 0 1-.177-.555c0-.265.11-.52.308-.707.197-.188.465-.293.744-.293Zm-7.368 1a.965.965 0 0 1-.177.555c-.116.165-.28.293-.473.369a1.104 1.104 0 0 1-.608.056 1.07 1.07 0 0 1-.539-.273.985.985 0 0 1-.288-.512.953.953 0 0 1 .06-.578c.08-.182.214-.339.388-.448a1.092 1.092 0 0 1 1.329.124.975.975 0 0 1 .308.707Zm5.263-8.999h-1.053v1c0 .265-.11.52-.308.707a1.081 1.081 0 0 1-.744.293c-.28 0-.547-.106-.745-.293a.975.975 0 0 1-.308-.707v-1H9.474a1.08 1.08 0 0 1-.745-.293A.975.975 0 0 1 8.421 7c0-.265.11-.52.308-.707.198-.187.465-.293.745-.293h1.052V5c0-.265.111-.52.309-.707.197-.187.465-.292.744-.292.279 0 .547.105.744.292a.975.975 0 0 1 .308.707v1h1.053c.28 0 .547.106.744.293a.975.975 0 0 1 .309.707c0 .265-.111.52-.309.707a1.081 1.081 0 0 1-.744.293Z"/>
          </svg>
          {/*description*/}
          <div className="flex flex-col overflow-hidden text-darkgray">
            <div className="inline-block">
              Category: {item.categories && item.categories[0].name}
            </div>
            <div className="inline-block">
              Tags: {item.description}
            </div>
          </div>
        </div>
      </div>
    </div>
    ) : (<p>Loading...</p>)
  );
};

export default SingleProduct;
