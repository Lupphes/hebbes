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
import ProductRow from "@/components/ProductRow";
import Ad from '@/components/Ad';
import React, { useState, useEffect } from 'react';
import CategoryList from "@/components/CategoryList";
import catJson from '@/mock_data/cat.json';

const ShopPage = () => {
  let skip = 0;
  let limit = 20;
  // const [items, setItems] = useState<Item[]>([]);
  const [items, setItems] = useState<Item[] | null>([]);
  const itemLimit = 20
  const [page, setPage] = useState(1);
  const pageDownClick = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const pageUpClick = () => {
    if(items)
    {
      setPage((prevPage) => prevPage + 1);
    }
  };
 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        limit = page * itemLimit
        skip = limit - itemLimit
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
  }, [page]);

  return (
    <div className="flex flex-col justify-start bg-text-white-op-100 p-10 w-[80%]">
      <div className="flex flex-col gap-10">
        <CategoryList data={catJson}/>
        <Ad/>
          {loading ? (
            <p> Loading... </p>
            ) : items ? (
            items.map((item: Item, index: number) => (
              <div key={item.id}>
                <ProductRow item={item}/>
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
        <div className="overflow-hidden flex flex-col items-end justify-center">
          <div className="self-stretch flex flex-row items-center justify-between md:flex-row md:gap-[38px] md:items-start md:justify-center">
          {page > 1 ? ( 
            <Button sx={{ width: 100 }} color="success" variant="outlined" onClick={pageDownClick}>
              Previous
            </Button>) : null}                
            {page > 1 ? ( 
            <Button sx={{ width: 60 }} color="success" variant="outlined" onClick={pageDownClick}>
              {page-1}
            </Button>) : null}            
            <Button sx={{ width: 60 }} color="success" variant="contained">
            {page}
            </Button>
            <Button sx={{ width: 60 }} color="success" variant="outlined" onClick={pageUpClick}>
              {page+1}
            </Button>
            <Button sx={{ width: 100 }} color="success" variant="outlined" onClick={pageUpClick}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
