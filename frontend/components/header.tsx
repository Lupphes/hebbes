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

  const isMobile = useMediaQuery("(max-width: 425px)");

  return (
    <div
      className="w-[1440px] overflow-hidden flex flex-col items-center justify-start text-left text-29xl text-black font-poppins"
      style={frameStyle}
    >
      <header className="bg-text-white-op-100 w-[1440px] h-[80px] flex flex-row items-center justify-start pt-[31px] px-[41.323890686035156px] pb-7 box-border gap-[71px] lg:w-auto lg:[align-self:unset] lg:h-auto lg:flex-col lg:gap-[12px] lg:items-center lg:justify-center md:w-auto md:[align-self:unset] md:h-auto md:flex-col md:gap-[15px] md:items-center md:justify-center md:pb-[29px] md:box-border sm:flex-col">
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
        <img
          className="relative w-[83.2px] h-[22.1px]"
          alt=""
          src="/group-1.svg"
        />
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
