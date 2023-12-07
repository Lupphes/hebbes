import type { NextPage } from "next";
import { useCallback } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import SearchHeader from "../components/search-header";
import ProductRowContainer from "../components/product-row-container";
import AdCard from "../components/ad-card";

const Shop3: NextPage = () => {
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


  return (
    <div className="relative bg-text-white-op-100 w-full h-[4021px] overflow-hidden">
      <Header
        home="Search"
        onHomeClick={onHomeClick}
        onDiscountsClick={onDiscountsClick}
        onAboutClick={onAboutClick}
        onPremiumClick={onPremiumClick}
      />
      <section className="absolute top-[3166px] left-[0px] w-[1440px] overflow-hidden flex flex-col items-center justify-start text-left text-13xl text-black font-poppins">
        <div className="self-stretch relative h-[300px]">
          <div className="absolute top-[0px] left-[0px] bg-darkolivegreen-100 w-[1440px] h-[300px]" />
          <div className="absolute top-[96px] left-[100px] w-[376px] flex flex-col items-start justify-start">
            <div className="self-stretch relative font-medium">Cheap Food</div>
            <div className="self-stretch relative text-xl text-text-white-op-100">
              Find the best deals in all the biggest Netherlands grocery stores
            </div>
          </div>
          <div className="absolute top-[96px] left-[522px] w-[376px] flex flex-col items-start justify-start">
            <div className="self-stretch relative font-medium">
              Easy to compare
            </div>
            <div className="self-stretch relative text-xl text-whitesmoke">
              You don’t need to stay in doubt if a product is cheaper in other
              story; just chek in the app
            </div>
          </div>
          <div className="absolute top-[96px] left-[944px] w-[376px] flex flex-col items-start justify-start">
            <div className="self-stretch relative font-medium">
              Personalized
            </div>
            <div className="self-stretch relative text-xl text-text-white-op-100">
              Find the products the best fits you and diet
            </div>
          </div>
        </div>
        <footer className="self-stretch bg-darkgray flex flex-col items-start justify-start pt-[98px] pb-[38px] pr-[99.9854736328125px] pl-[102.00732421875px] gap-[48px] text-center text-base text-darkolivegreen-100 font-poppins lg:flex-col">
          <div className="w-[951px] flex flex-row items-center justify-start gap-[136px]">
            <div className="flex-1 overflow-hidden flex flex-col items-center justify-start">
              <div className="self-stretch relative">
                Nijmegen, the Netherlands
              </div>
            </div>
            <div className="flex-1 relative h-[312px] text-left">
              <div className="absolute top-[0px] left-[0px] w-[359px] flex flex-row items-start justify-between">
                <div className="w-[76px] h-[312px] flex flex-col items-start justify-start gap-[55px]">
                  <div className="relative font-medium">Links</div>
                  <div className="w-[74px] h-[233px] flex flex-col items-start justify-start gap-[46px]">
                    <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-medium font-poppins text-black text-left inline-block">
                      Home
                    </button>
                    <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-medium font-poppins text-black text-left inline-block">
                      Items
                    </button>
                    <button
                      className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-medium font-poppins text-black text-left inline-block"
                      onClick={onAboutClick}
                    >
                      About
                    </button>
                    <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-medium font-poppins text-black text-left inline-block">
                      Premium
                    </button>
                  </div>
                </div>
                <div className="w-[147px] h-[242px] flex flex-col items-start justify-start gap-[55px]">
                  <div className="relative font-medium">Help</div>
                  <div className="w-[147px] h-[163px] flex flex-col items-start justify-start gap-[45px] text-black">
                    <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-medium font-poppins text-black text-left inline-block">
                      How it works?
                    </button>
                    <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-medium font-poppins text-black text-left inline-block">
                      What is Premium?
                    </button>
                    <div className="relative font-medium">Privacy Policies</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[2px] left-[424px] w-[286px] flex flex-col items-start justify-start gap-[53px]">
                <div className="relative font-medium">
                  Enter in the line for premium
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[10px]">
                  <TextField
                    className="[border:none] bg-[transparent] flex-1"
                    color="success"
                    label="Enter Your Email Address"
                    variant="standard"
                  />
                  <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[75px] h-6 overflow-hidden shrink-0 flex flex-col items-start justify-end gap-[3px]">
                    <div className="relative text-sm font-medium font-poppins text-black text-left">
                      SUBSCRIBE
                    </div>
                    <div className="relative box-border w-[77px] h-0.5 border-t-[1px] border-solid border-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[35px] text-left text-black">
            <div className="self-stretch relative box-border h-px border-t-[1px] border-solid border-gainsboro" />
            <div className="relative">
              2023 Price Bandit. All rights reverved
            </div>
          </div>
        </footer>
      </section>
      <SearchHeader />
      <section className="absolute top-[752px] left-[114px] w-[1212px] h-[2312.4px]">
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
        <ProductRowContainer
          dimensions="/asgaard-sofa-323@2x.png"
          productDimensions="/asgaard-sofa-324@2x.png"
          productDimensions2="/asgaard-sofa-326@2x.png"
          productDimensionsText="/asgaard-sofa-328@2x.png"
          productDimensionsCode="/asgaard-sofa-329@2x.png"
          productDimensionsCode2="/asgaard-sofa-330@2x.png"
        />
        <AdCard />
        <AdCard propTop="1041px" />
        <AdCard propTop="0px" />
        <ProductRowContainer
          dimensions="/asgaard-sofa-323@2x.png"
          productDimensions="/asgaard-sofa-324@2x.png"
          productDimensions2="/asgaard-sofa-326@2x.png"
          productDimensionsText="/asgaard-sofa-328@2x.png"
          productDimensionsCode="/asgaard-sofa-329@2x.png"
          productDimensionsCode2="/asgaard-sofa-330@2x.png"
          propTop="321px"
        />
        <ProductRowContainer
          dimensions="/asgaard-sofa-323@2x.png"
          productDimensions="/asgaard-sofa-324@2x.png"
          productDimensions2="/asgaard-sofa-326@2x.png"
          productDimensionsText="/asgaard-sofa-328@2x.png"
          productDimensionsCode="/asgaard-sofa-329@2x.png"
          productDimensionsCode2="/asgaard-sofa-330@2x.png"
          propTop="495px"
        />
        <ProductRowContainer
          dimensions="/asgaard-sofa-323@2x.png"
          productDimensions="/asgaard-sofa-324@2x.png"
          productDimensions2="/asgaard-sofa-326@2x.png"
          productDimensionsText="/asgaard-sofa-328@2x.png"
          productDimensionsCode="/asgaard-sofa-329@2x.png"
          productDimensionsCode2="/asgaard-sofa-330@2x.png"
          propTop="664px"
        />
        <ProductRowContainer
          dimensions="/asgaard-sofa-323@2x.png"
          productDimensions="/asgaard-sofa-324@2x.png"
          productDimensions2="/asgaard-sofa-326@2x.png"
          productDimensionsText="/asgaard-sofa-328@2x.png"
          productDimensionsCode="/asgaard-sofa-329@2x.png"
          productDimensionsCode2="/asgaard-sofa-330@2x.png"
          propTop="838px"
        />
        <ProductRowContainer
          dimensions="/asgaard-sofa-331@2x.png"
          productDimensions="/asgaard-sofa-332@2x.png"
          productDimensions2="/asgaard-sofa-333@2x.png"
          productDimensionsText="/asgaard-sofa-334@2x.png"
          productDimensionsCode="/asgaard-sofa-335@2x.png"
          productDimensionsCode2="/asgaard-sofa-336@2x.png"
          propTop="1191px"
        />
        <ProductRowContainer
          dimensions="/asgaard-sofa-331@2x.png"
          productDimensions="/asgaard-sofa-332@2x.png"
          productDimensions2="/asgaard-sofa-333@2x.png"
          productDimensionsText="/asgaard-sofa-334@2x.png"
          productDimensionsCode="/asgaard-sofa-335@2x.png"
          productDimensionsCode2="/asgaard-sofa-336@2x.png"
          propTop="1365px"
        />
        <ProductRowContainer
          dimensions="/asgaard-sofa-331@2x.png"
          productDimensions="/asgaard-sofa-332@2x.png"
          productDimensions2="/asgaard-sofa-333@2x.png"
          productDimensionsText="/asgaard-sofa-334@2x.png"
          productDimensionsCode="/asgaard-sofa-335@2x.png"
          productDimensionsCode2="/asgaard-sofa-336@2x.png"
          propTop="1539px"
        />
        <ProductRowContainer
          dimensions="/asgaard-sofa-331@2x.png"
          productDimensions="/asgaard-sofa-332@2x.png"
          productDimensions2="/asgaard-sofa-333@2x.png"
          productDimensionsText="/asgaard-sofa-334@2x.png"
          productDimensionsCode="/asgaard-sofa-335@2x.png"
          productDimensionsCode2="/asgaard-sofa-336@2x.png"
          propTop="1708px"
        />
        <ProductRowContainer
          dimensions="/asgaard-sofa-331@2x.png"
          productDimensions="/asgaard-sofa-332@2x.png"
          productDimensions2="/asgaard-sofa-333@2x.png"
          productDimensionsText="/asgaard-sofa-334@2x.png"
          productDimensionsCode="/asgaard-sofa-335@2x.png"
          productDimensionsCode2="/asgaard-sofa-336@2x.png"
          propTop="1882px"
        />
      </section>
    </div>
  );
};

export default Shop3;
