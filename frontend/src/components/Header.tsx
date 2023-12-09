'use client';
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import HeaderBackground from "@/resources/HeaderBackground.png";
import HeaderLogo from "@/resources/HeaderLogo.png";


type HeaderType = {
  title?: string;
  /** Action props */
};

const Header: NextPage<HeaderType> = ({
  title,
}) => {
  const router = useRouter();

  const onHomeClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const onDiscountsClick = useCallback(() => {
    router.push("/"); // TODO: change to hot items
  }, [router]);

  const onAboutClick = useCallback(() => {
    router.push("/about");
  }, [router]);

  const onPremiumClick = useCallback(() => {
    router.push("/about");
  }, [router]);

  return (
    <div className="flex flex-col items-center text-29xl font-poppins">
      <header className="flex flex-row my-7 gap-7
                          w-[95%] justify-between md:item-center md:justify-center
                          md:flex-col sm:flex-col">
        <div className="h-6 flex flex-row flex-none place-items-center">
          <Button
            className=""
            color="success"
            variant="outlined"
            onClick={onHomeClick}
          >
            Home
          </Button>
          <Button
            className=""
            color="success"
            variant="outlined"
            onClick={onDiscountsClick}
          >
            Discounts
          </Button>
          <Button
            className=""
            color="success"
            variant="outlined"
            onClick={onAboutClick}
          >
            About
          </Button>
          <Button
            className=""
            color="success"
            variant="outlined"
            onClick={onPremiumClick}
          >
            Premium
          </Button>
        </div>
        <TextField
          className="[border:none] bg-[transparent] flex-initial w-full"
          color="success"
          label="Product Searched"
          variant="outlined"
        />
        <div className="flex-none gap-x-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </header>
      <div className='flex flex-col items-center bg-cover bg-no-repeat w-full' style={{ backgroundImage: `url(${HeaderBackground.src})`, height: '300px' }}>
        <img
          className="w-[200px] object-cover"
          alt=""
          src={HeaderLogo.src}
        />
        <div className="h-auto font-medium">{title}</div>
      </div>
    </div>
  );
};

export default Header;
