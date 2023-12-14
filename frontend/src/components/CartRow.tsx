'use client';
import type { NextPage } from "next";
import AH from "@/resources/AH.jpg";
import JMB from "@/resources/JMB.jpg";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';

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

const CartRow: NextPage<{item: Item, result: LowestHighest}> = ({ item, result}) => {
    const keysArray = Object.keys(item.item_info);
    const router = useRouter();
    const ClickableProductRow = (itemId : number) => {
        // Handle the click event here, e.g., navigate to a new page, open a modal, etc.
        router.push(`/single-product?id=${itemId}`);
    };

    const [cartItems, setCartItems] = useState<Item[]>([]);

    useEffect(() => {
        // Check if running on the client side
        if (typeof window !== 'undefined') {
          const localCart = localStorage.getItem('cart');
          if (localCart) {
            setCartItems(JSON.parse(localCart));
          } else {
            // Initialize cartItems if not found in localStorage
            localStorage.setItem('cart', JSON.stringify([]));
            setCartItems([]);
          }
        }
      }, []);

    const ClickAbleRemoveCartItem = (item: Item) => {
        const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
            }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.location.reload();
    };

    return (
    <tr className="items-center">
        {/*product*/}
        <td onClick={() => ClickableProductRow(item.id)} className="items-center">
            <div className="flex flex-row box-border">
                <img
                className="w-24 h-24 sm:w-20 sm:h-20"
                alt=""
                src={item.picture_link ? item.picture_link.url : "/"}
                />
            </div>
            <div className="text-black">
                {item.name}
            </div>
        </td>
        {/*store*/}
        <td className="items-center">
            <img
                className="rounded-8xs w-12 h-10"
                alt=""
                src={item.item_info[result.lowestKey].store_id && item.item_info[result.lowestKey].store_id == 1 ? AH.src : JMB.src}
            />
        </td>
        {/*price*/}
        <td className="text-black">
            € {item.item_info[result.lowestKey].price ? item.item_info[result.lowestKey].price : item.item_info[keysArray[0]].price}
        </td>
        {/*avg price*/}
        <td className="text-gray">
            € {item.item_info && findAveragePrice(item.item_info)}
        </td>
        {/*quantity*/}
        <td className="">
            <input
              className="font-poppins text-base bg-[transparent] rounded-8xs box-border w-8 h-8 justify-center
                         border-[1px] border-solid border-darkgray"
              placeholder=  {item.cartQuantity.toString()}
              type="text"
            />
        </td>
        {/*subTotal*/}
        <td className="text-black">
            € {item.item_info[result.lowestKey].price ? item.item_info[result.lowestKey].price * item.cartQuantity : item.item_info[keysArray[0]].price * item.cartQuantity}
        </td>
        {/*trashcan*/}
        <td onClick={() => ClickAbleRemoveCartItem(item)} className="relative pb-[21px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </td>
    </tr>
    );
};

export default CartRow;