import StoreListing from '@/components/StoreListing';
import type { NextPage } from "next";
import React, { useState } from 'react';
import QuantityAdjuster from '../components/QuantityAdjuster';

interface SinglePriceProps {
  price: string;
  imageSrc: string;
}

interface SingleProductProps {
  name: string;
  imageSrc: string;
  category: string;
  tags: string[];
}

const findIndexOfCheapestProduct = (prices: SinglePriceProps[]): number => {
  if (prices.length === 0) {
    return -1; // Return -1 if the list is empty
  }

  let lowestIndex = 0;

  for (let i = 1; i < prices.length; i++) {
    const lowestPrice = parseFloat(prices[lowestIndex].price || "");
    const currentPrice = parseFloat(prices[i].price || "");

    if (isNaN(lowestPrice) || currentPrice < lowestPrice) {
      lowestIndex = i;
    }
  }

  return lowestIndex;
};

const findAveragePrice = (products: SinglePriceProps[]): number => {
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

type SingleComponentProps = {
  singleProduct: SingleProductProps;
  singlePrices: SinglePriceProps[];
};


const SingleProduct: NextPage<SingleComponentProps> = ({ singleProduct, singlePrices }) => {
  const indexOfCheapest = findIndexOfCheapestProduct(singlePrices);
  const averagePrice = findAveragePrice(singlePrices);

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
            src={singleProduct.imageSrc}
          />
        </div>
        {/*concent of the product*/}
        <div className="flex flex-col gap-8">
          {/*product name*/}
          <div className="text-23xl inline-block ">
            {singleProduct.name}
          </div>
          {/*product price overview*/}
          <div className="flex flex-row items-center justify-between">
            {/*best price*/}
            <div className="flex flex-row items-start gap-[5px]">
              <div className="font-medium inline-block ">
                € {singlePrices[indexOfCheapest].price}
              </div>
              <div className="font-medium text-darkolivegreen-100 inline-block">
                Best Price
              </div>
              <img
                className="w-8 h-8 object-cover"
                alt=""
                src={singlePrices[indexOfCheapest].imageSrc}
              />
            </div>
            {/*average price*/}
            <div className="flex flex-row items-end gap-[5px]">
              <div className="font-medium inline-block ">
                € {averagePrice}
              </div>
              <div className="font-medium text-darkolivegreen-100 inline-block">
                Avg. Price
              </div>
            </div>
          </div>
          {/*Suggested Stores*/}
          <StoreListing singleStores={singlePrices}/>
          {/*quantity*/}
          <QuantityAdjuster quantity={quantity} onQuantityChange={handleQuantityChange} />
          {/*description*/}
          <div className="flex flex-col overflow-hidden text-darkgray">
            <div className="inline-block">
              Category: {singleProduct.category}
            </div>
            <div className="inline-block">
              Tags: {singleProduct.tags.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
