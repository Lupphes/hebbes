'use client';
import SingleProduct from '@/components/SingleProduct';
import CocaCola from "@/resources/CocaCola.jpg";
import AH from "@/resources/AH.jpg";
import React, { useState, useEffect } from 'react';

const SingleProductPage = () => {
  
  const itemId = 5; //This fetches what item to fetch
  const [items, setItem] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const url = `http://localhost:5000/db/items?id=${itemId}`;
        const response = await fetch(url);
        const result = await response.json();
        setItem(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
    }, [itemId]);
  
  return (
      <div className="bg-text-white-op-100 overflow-hidden flex flex-col items-center justify-start gap-[45px]">
          <div className="flex flex-col items-center justify-start">
            {/*<Ad/>*/}
            {loading ? (
              <p> Loading... </p>
              ) : items ? (
                <SingleProduct
                item={items[0]}
                />
              ) : (
              <p>Api connection missing.</p>
              )}              
              {/*<Ad/>*/}
          </div>
      </div>
    );
  };

export default SingleProductPage;