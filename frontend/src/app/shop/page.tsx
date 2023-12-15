'use client';
import {
  Button,
} from "@mui/material";
import ProductRow from "@/components/ProductRow";
import Ad from '@/components/Ad';
import React, { useState, useEffect } from 'react';
import CategoryList from "@/components/CategoryList";
import catJson from '@/mock_data/cat.json';
import { useSearchParams } from "next/navigation";

const ShopPage = () => {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("query"));
  const [category_id, setCategoryId] = useState(params.get("category_id"));
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let skip = 0;
  let limit = 20;

  const [errorMsg, setErrorMsg] = useState(null);

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

  const [category, setCategory] = useState(catJson);

  useEffect(() => {
    setQuery(params.get("query"));
    setCategoryId(params.get("category_id"));

    const fetchItems = async () => {
      try {
        limit = page * itemLimit
        skip = limit - itemLimit
        
        let url = `${apiUrl}/db/search?`

        if(!query && category_id){ // Checks if not query and category_id -> search in category
          url = `${apiUrl}/db/items?category_id=${category_id}`
          // setSubCategory(category_id);
        }
        else if(query) // Checks if query -> search for item name
        {
          url += `query=${query}&`
        }
        else if(category_id) // Checks if query -> search for item name and category
        {
          url += `category_id=${category_id}&`
        }

        url += `&limit=${limit}&skip=${skip}`;
        const response = await fetch(url);
        const result = await response.json(); // TODO: type response
        if (!result.success)
        {
          setItems(null)
          setErrorMsg(result.message)
        }
        setItems(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      setQuery(params.get("query"));
      setCategoryId(params.get("category_id"));

      if(category_id)
      {
        try {
          const response = await fetch(`${apiUrl}/db/subcategories/${category_id}`);
          const result = await response.json(); // TODO: type response
          if (!result.success)
          {
            setErrorMsg(result.message)
          }
          setCategory(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    }


    fetchItems();
    fetchCategories();
  }, [page, query, category_id]);

  useEffect(() => {
    setQuery(params.get("query"));
    setCategoryId(params.get("category_id"));
  }, [params]);

  return (
    <div className="flex flex-col justify-start bg-text-white-op-100 p-10 w-[80%]">
      <div className="flex flex-col gap-10">
        <CategoryList data={category}/>
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
            )) : errorMsg ? (
              <p>{errorMsg}</p>
            ) : (
              <p> Api connection missing. </p>
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
