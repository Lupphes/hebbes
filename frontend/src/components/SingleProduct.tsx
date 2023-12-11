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
                src={item.item_info[cheapestIndex].id == 1 ? AH.src : JMB.src}
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
