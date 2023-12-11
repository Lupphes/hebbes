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
  const [items, setItems] = useState<Item[] | null>([
    {
      "id":5,
      "name":"Campina Halfvolle yoghurt vanillesmaak",
      "brand":"Campina",
      "description":"Door de jarenlange ervaring van de Campina boeren maakt Campina heerlijke producten. Al 150 jaar. Ze halen de eerlijke en pure kracht uit de natuur. En dat proef je.",
      "gln":"8710912888888",
      "gtin":"08712800001560",
      "measurements_units":"null",
      "measurements_amount":"null",
      "measurements_label":"1 l",
      "picture_link": {
        "id":25,
        "item_id":5,
        "category_id":null,
        "width":200,
        "height":200,
        "url":"https://static.ah.nl/dam/product/AHI_43545239373933313234?revLabel=2&rendition=200x200_JPG_Q85&fileType=binary"
      },
      "categories":
        [
          {
            "id":16,
            "category_id":1730,
            "name":"Zuivel, plantaardig en eieren",
            "parent_id":null,
            "subcategories":[],
            "pictures":
              [
                {
                  "id":20,
                  "item_id":null,
                  "category_id":16,
                  "width":600,
                  "height":400,
                  "url":"https://static.ah.nl/binaries/ah/content/gallery/ahmobile/product-categories/nl/2023/week-31/producttegels_zuivel_app_wk35.png"
                }
              ]
          },
          {
            "id":17,
            "category_id":1711,
            "name":"Yoghurt en kwark",
            "parent_id":16,
            "subcategories":[],
            "pictures":
              [
                {
                  "id":21,
                  "item_id":null,
                  "category_id":17,
                  "width":708,
                  "height":708,
                  "url":"https://static.ah.nl/dam/product/AHI_43545239393331373339?revLabel=1&rendition=LowRes_JPG&fileType=binary"
                }
              ]
          },
          {
            "id":18,
            "category_id":18261,
            "name":"Yoghurt",
            "parent_id":17,
            "subcategories":[],
            "pictures":[
              {
                "id":22,
                "item_id":null,
                "category_id":18,
                "width":708,
                "height":708,
                "url":"https://static.ah.nl/dam/product/AHI_43545239393331373339?revLabel=1&rendition=LowRes_JPG&fileType=binary"
              }
            ]
          },
          {
            "id":19,
            "category_id":5147,
            "name":"Yoghurt met smaak",
            "parent_id":18,
            "subcategories":[],
            "pictures": [
              {
                "id":23,
                "item_id":null,
                "category_id":19,
                "width":708,
                "height":708,
                "url":"https://static.ah.nl/dam/product/AHI_43545239393239303939?revLabel=1&rendition=LowRes_JPG&fileType=binary"
              }
            ]
          },
          {
            "id":20,
            "category_id":10949,
            "name":"Vanille yoghurt",
            "parent_id":19,
            "subcategories":[],
            "pictures":[
              {
                "id":24,
                "item_id":null,
                "category_id":20,
                "width":708,
                "height":708,
                "url":"https://static.ah.nl/dam/product/AHI_43545239393239303939?revLabel=1&rendition=LowRes_JPG&fileType=binary"
              }
            ]
          }
        ],
      "item_info":{
        "jmb":{
          "id":6,
          "item_id":5,
          "store_id":2,
          "product_link":"null",
          "price":197.0,
          "discount_info":[]
        },
        "ah":{
          "id":5,
          "item_id":5,
          "store_id":1,
          "product_link":"https://www.ah.nl/producten/product/wi123",
          "price":1.99,
          "discount_info":[]
        }
      }
    }]);
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
