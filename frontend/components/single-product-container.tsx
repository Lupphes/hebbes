import type { NextPage } from "next";
import Ad from "./ad";

import StoreListingContainer from "../components/store-listing-container";
import React, { useState } from 'react';
import QuantityAdjuster from '../components/QuantityAdjuster';

interface SingleProductProps {
  price: string;
  imageSrc: string;
}

interface SingleProductList{
  singleProducts: SingleProductProps[];
}

const findIndexOfCheapestProduct = (products: SingleProductProps[]): number => {
  if (products.length === 0) {
    return -1; // Return -1 if the list is empty
  }

  let lowestIndex = 0;

  for (let i = 1; i < products.length; i++) {
    const lowestPrice = parseFloat(products[lowestIndex].price || "");
    const currentPrice = parseFloat(products[i].price || "");

    if (isNaN(lowestPrice) || currentPrice < lowestPrice) {
      lowestIndex = i;
    }
  }

  return lowestIndex;
};

const findAveragePrice = (products: SingleProductProps[]): number => {
  if (products.length === 0) {
    return 0; // or throw an error, depending on your use case
  }

  let sum = 0;

  for(let i = 0; i < products.length; i++){
    sum = parseFloat(products[i].price) + sum;
  }

  // Calculate the average
  const average = sum / products.length;

  return average;
};

const SingleProductContainer: NextPage<SingleProductList> = ({ singleProducts }) => {
  const indexOfCheapest = findIndexOfCheapestProduct(singleProducts);
  const averagePrice = findAveragePrice(singleProducts);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="overflow-hidden shrink-0 text-left text-base text-black font-poppins">
      <div className="flex flex-row items-start justify-start">
        {/*Image div that is on the left of the rest*/}
        <div className="items-left justify-start">
          <img
            className="w-[423px] h-[500px] object-cover bg-darkolivegreen-300 rounded-3xs"
            alt=""
            src="/asgaard-sofa-3@2x.png"
          />
        </div>
        {/*concent of the product*/}
        <div className="flex flex-col">
          {/*product name*/}
          <div className="text-23xl inline-block ">
            Coca-Cola 1.5L
          </div>
          {/*product price overview*/}
          <div className="flex flex-row items-center justify-start gap-[5px]">
            {/*best price*/}
            <div>
              <div className="font-medium inline-block ">
                € {singleProducts[indexOfCheapest].price}
              </div>
              <div className="font-medium text-darkolivegreen-100 inline-block">
                Best Price
              </div>
              <img
                className="w-[39px] h-[26px] object-cover"
                alt=""
                src={singleProducts[indexOfCheapest].imageSrc}
              />
            </div>
            {/*average price*/}
            <div className="flex flex-row items-end justify-end gap-[5px]">
              <div className="font-medium inline-block ">
                € {averagePrice}
              </div>
              <div className="font-medium text-darkolivegreen-100 inline-block">
                Avg. Price
              </div>
            </div>
          </div>
          {/*Suggested Stores*/}
          <StoreListingContainer singleStores={singleProducts}/>
          {/*quantity*/}
          <QuantityAdjuster quantity={quantity} onQuantityChange={handleQuantityChange} />
          {/*description*/}
          <div className="flex flex-col overflow-hidden text-darkgray">
            <div className="inline-block">
              Category: Soft Drinks
            </div>
            <div className="inline-block">
              Tags: Soft Drinks, Coca-Cola
            </div>
          </div>

          <img
            className="absolute top-[394px] left-[0px] w-[812.9px] h-px"
            alt=""
            src="/group.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductContainer;
