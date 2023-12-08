'use client';

import type { NextPage } from "next";
import { useCallback } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ProductRowContainer from "@/components/ProductRow";
import Ad from '@/components/Ad';

const ShopPage = () => {
    const router = useRouter();

    const onHomeClick = useCallback(() => {
      router.push("/");
    }, [router]);

    const onDiscountsClick = useCallback(() => {
      router.push("/"); // TODO: change to hot items
    }, [router]);

    const onAboutClick = useCallback(() => {
      router.push("/price-bandit");
    }, [router]);

    const onPremiumClick = useCallback(() => {
      router.push("/price-bandit");
    }, [router]);

    interface singleStore {
        price: string;
        imageSrc: string;
      }
        
    interface itemList{
    name: string;
    singleStores: singleStore[];
    }

    interface itemsList{
    items: itemList[];
    }
    
    const twoItemsTest: itemsList = {
    items: [
        {
        name: "item1",
        singleStores: [
            {
            price: "2.55",
            imageSrc: "/asgaard-sofa-312@2x.png",
            },
            {
            price: "2.20",
            imageSrc: "/asgaard-sofa-312@2x.png",
            },
        ],
        },
        {
        name: "item2",
        singleStores: [
            {
            price: "3.00",
            imageSrc: "/another-item-image.png",
            },
            {
            price: "2.50",
            imageSrc: "/another-item-image.png",
            },
        ],
        },
    ]};


  return (
    <div className="relative bg-text-white-op-100 w-full h-[4021px] overflow-hidden">
      <div>
        <Ad/>
        {twoItemsTest.items.map((item: itemList, index: number) => (
          <div>
            <ProductRowContainer 
            name={item.name}
            singleStores={item.singleStores}
            />
            {(index == 5 ? 
            <div>
              <Ad/>
            </div>
             : null)}
          </div>
        ))}
        <Ad/>
      </div>
      {/*
        <div className="absolute top-[2251px] left-[385px] w-[442px] overflow-hidden flex flex-col items-end justify-center">
          <div className="self-stretch flex flex-row items-center justify-between md:flex-row md:gap-[38px] md:items-start md:justify-start">
            <Button sx={{ width: 60 }} color="success" variant="contained">
              1
            </Button>
            <Button sx={{ width: 60 }} color="success" variant="outlined">
              2
            </Button>
            <Button sx={{ width: 60 }} color="primary" variant="outlined">
              3
            </Button>
            <Button sx={{ width: 98 }} color="success" variant="outlined">
              Next
            </Button>
          </div>
        </div>
        */}
    </div>
  );
};

export default ShopPage;
