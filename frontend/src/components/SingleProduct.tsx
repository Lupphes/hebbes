import StoreListing from '@/components/StoreListing';
import type { NextPage } from "next";
import React, { useState } from 'react';
import QuantityAdjuster from '../components/QuantityAdjuster';
import AH from "@/resources/AH.jpg";

const findIndexOfCheapestStore = (stores: ItemInfo[]): number => {
  if (stores.length === 0) {
      return -1; // Return -1 if the list is empty
  }
  let lowestIndex = 0;
  for (let i = 1; i < stores.length; i++) {
      const lowestPrice = stores[lowestIndex].price;
      const currentPrice = stores[i].price;

      if (lowestPrice || currentPrice < lowestPrice) {
          lowestIndex = i;
      }
  }
  return lowestIndex;
  };


const findAveragePrice = (stores: ItemInfo[]): number => {
  if (stores.length === 0) {
    return 0; // or throw an error, depending on your use case
  }
  let sum = 0;
  for(let i = 0; i < stores.length; i++){
      sum = stores[i].price + sum;
  };
  // Calculate the average
  const average = sum / stores.length;
  return average;
  };

const SingleProduct: NextPage<{item: Item}> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="overflow-hidden shrink-0 text-left text-base text-black font-poppins my-5">
      <div className="flex flex-row items-start justify-start md:flex-col md:items-center gap-8 w-[95%]">
        {/*Image div that is on the left of the rest*/}
        <div className="items-left justify-start">
          <img
            className="object-cover bg-darkolivegreen-300 rounded-3xs"
            alt=""
            src= {AH.src}
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
                € {item.item_infos && item.item_infos[findIndexOfCheapestStore(item.item_infos)].price}
              </div>
              <div className="font-medium text-darkolivegreen-100 inline-block">
                Best Price
              </div>
              <img
                className="w-8 h-8 object-cover"
                alt=""
                src= {AH.src}
              />{/*item.item_infos[indexOfCheapest].store_id TODO: should be picture of shop*/}
            </div>
            {/*average price*/}
            <div className="flex flex-row items-end gap-[5px]">
              <div className="font-medium inline-block ">
                € {item.item_infos && findAveragePrice(item.item_infos)}
              </div>
              <div className="font-medium text-darkolivegreen-100 inline-block">
                Avg. Price
              </div>
            </div>
          </div>
          {/*Suggested Stores*/}
          <StoreListing item={item}/>
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
  );
};

export default SingleProduct;
