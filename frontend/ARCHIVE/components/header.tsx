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


type HeaderType = {
  home?: string;

  /** Style props */
  frameWidth?: CSSProperties["width"];
  frameAlignSelf?: CSSProperties["alignSelf"];
  frameOverflow?: CSSProperties["overflow"];
  framePosition?: CSSProperties["position"];
  frameTop?: CSSProperties["top"];
  frameLeft?: CSSProperties["left"];
  rectangleIconWidth?: CSSProperties["width"];
  rectangleIconHeight?: CSSProperties["height"];

  /** Action props */
  onHomeClick?: () => void;
  onDiscountsClick?: () => void;
  onAboutClick?: () => void;
  onPremiumClick?: () => void;
};

const Header: NextPage<HeaderType> = ({
  home,
  frameWidth,
  frameAlignSelf,
  frameOverflow,
  framePosition,
  frameTop,
  frameLeft,
  rectangleIconWidth,
  rectangleIconHeight,
  onHomeClick,
  onDiscountsClick,
  onAboutClick,
  onPremiumClick,
}) => {
  const frameStyle: CSSProperties = useMemo(() => {
    return {
      width: frameWidth,
      alignSelf: frameAlignSelf,
      overflow: frameOverflow,
      position: framePosition,
      top: frameTop,
      left: frameLeft,
    };
  }, [
    frameWidth,
    frameAlignSelf,
    frameOverflow,
    framePosition,
    frameTop,
    frameLeft,
  ]);

  const rectangleIconStyle: CSSProperties = useMemo(() => {
    return {
      width: rectangleIconWidth,
      height: rectangleIconHeight,
    };
  }, [rectangleIconWidth, rectangleIconHeight]);

  return (
    <div
      className="w-[1440px] overflow-hidden flex flex-col items-center justify-start text-left text-29xl text-black font-poppins"
      style={frameStyle}
    >
      <header className="bg-text-white-op-100 w-[1440px] h-[80px] flex flex-row items-center justify-center pt-[31px] px-[41.323890686035156px] pb-7 box-border gap-[71px] lg:w-auto lg:[align-self:unset] lg:h-auto lg:flex-col lg:gap-[12px] lg:items-center lg:justify-center md:w-auto md:[align-self:unset] md:h-auto md:flex-col md:gap-[15px] md:items-center md:justify-center md:pb-[29px] md:box-border sm:flex-col">
        <div className="w-[424px] h-6 flex flex-row items-center justify-start sm:w-auto sm:[align-self:unset] sm:flex-row sm:items-center sm:justify-center">
          <Button
            className="relative"
            sx={{ width: 'calc(25% - 10px)' }}
            color="success"
            variant="outlined"
            onClick={onHomeClick}
          >
            Home
          </Button>
          <Button
            className="relative"
            sx={{ width: 'calc(25% - 10px)' }}
            color="success"
            variant="outlined"
            onClick={onDiscountsClick}
          >
            Discounts
          </Button>
          <Button
            className="relative cursor-pointer"
            sx={{ width: 'calc(25% - 10px)' }}
            color="success"
            variant="outlined"
            onClick={onAboutClick}
          >
            About
          </Button>
          <Button
            className="relative cursor-pointer"
            sx={{ width: 'calc(25% - 10px)' }}
            color="success"
            variant="outlined"
            onClick={onPremiumClick}
          >
            Premium
          </Button>
        </div>
        <div className="w-[703px] flex flex-col items-center justify-center md:w-[95%] sm:w-[95%]">
          <TextField
            className="[border:none] bg-[transparent] self-stretch relative"
            color="success"
            label="Product Searched"
            variant="outlined"
          />
        </div>
        <div className="relative w-[50px] gap-x-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

      </header>
      <div className="h-[300px] flex flex-col items-center justify-end">
        <img
          className="relative h-[320px] object-cover"
          alt=""
          src="/rectangle-1@2x.png"
          style={rectangleIconStyle}
        />
        <div className="flex flex-col items-center justify-start mt-[-316px]">
          <img
            className="relative w-[200px] object-cover"
            alt=""
            src="/meubel-house-logos05@2x.png"
          />
          <div className="relative h-auto font-medium">{home}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
