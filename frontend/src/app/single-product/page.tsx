'use client';
import SingleProduct from '@/components/SingleProduct';
import CocaCola from '@/resources/CocaCola.jpg';
import AH from '@/resources/AH.jpg';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SingleProductPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  let itemId = 5;
  if (id) {
    itemId = parseInt(id, 10);
  }

  const [items, setItem] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiUrl}/db/items?id=${itemId}`;
        const response = await fetch(url);
        const result = await response.json();
        setItem(result.data);
        setSuccess(result.success);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  return (
    <div className='flex flex-col items-center justify-start overflow-hidden'>
      <div className='flex flex-col items-center justify-start'>
        {loading ? (
          <p> Loading... </p>
        ) : success && items ? (
          <SingleProduct item={items[0]} />
        ) : (
          <p>Api failure.</p>
        )}
      </div>
    </div>
  );
};

export default SingleProductPage;
