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
import React, { useState, useEffect } from 'react';

const ShopPage = () => {
  const skip = 0;
  const limit = 20;
  // const [items, setItems] = useState<Item[]>([]);
  const [items, setItems] = useState<Item[] | null>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const url = `http://localhost:5000/db/items?limit=${limit}&skip=${skip}`;
        const response = await fetch(url);
        const result = await response.json();
        setItems(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [skip, limit]);

  return (
    <div className="flex flex-col justify-start bg-text-white-op-100 p-10 w-[80%]">
      <div className="flex flex-col gap-10">
        <Ad/>
          {loading ? (
            <p> Loading... </p>
            ) : items ? (
            items.map((item: Item, index: number) => (
              <div key={item.id}>{/*change to id, something that is unique TODO*/}
                <p>{item.id}</p>
                <ProductRowContainer item={item}/>
                {((index % 5) === 0 && index != 0 ? 
                  <div>
                    <Ad/>
                  </div>
                : null)}
              </div>  )
            )) : (
              <p>Api connection missing.</p>
            )
          }
        <Ad/>
      </div>
      {/*
        Pagination html
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
