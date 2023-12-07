import type { NextPage } from "next";
import { useCallback } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import { useRouter } from "next/router";

const Footer: NextPage = () => {
  const router = useRouter();

  const onAboutClick = useCallback(() => {
    router.push("/price-bandit");
  }, [router]);

  return (
    <footer className="self-stretch bg-darkgray flex
                        w-auto h-auto
                        flex-col items-start justify-start
                        pt-[50px] pb-[30px] pr-[5%] pl-[5%]
                        text-center text-base text-darkolivegreen-100 font-poppins">
      <div className="flex flex-row md:flex-col items-center h-auto justify-start w-full pb-[35px] relative">
        <div className="w-1/4 md:w-[90%] items-center justify-start">
          <div className="self-stretch">Nijmegen, the Netherlands</div>
        </div>
        <div className="w-1/4 md:w-[90%] md:py-15 flex flex-col items-start justify-start gap-[40px]">
          <div className="relative py-2 font-medium">Links</div>
          <div className="flex flex-col items-start justify-start gap-[46px]">
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
        <div className="w-1/4 md:w-[90%] md:py-15 flex flex-col items-start justify-start gap-[40px]">
          <div className="relative py-2 font-medium">Help</div>
          <div className="flex flex-col items-start justify-start gap-[45px] text-black">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-medium font-poppins text-black text-left inline-block">
              How it works?
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-medium font-poppins text-black text-left inline-block">
              What is Premium?
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-medium font-poppins text-black text-left inline-block">
              Privacy Policies
            </button>
          </div>
        </div>
        <div className="w-1/4 md:w-[90%] md:py-15 flex flex-col gap-[40px] items-start">
          <div className="relative font-medium">
            Enter in the line for premium
          </div>
          <div className="self-stretch flex flex-row md:flex-col gap-[10px]">
            <TextField
                className="[border:none] bg-[transparent] self-stretch relative"
                color="success"
                label="Email Address"
                variant="outlined"
              />
            <button className="cursor-pointer p-0 bg-[transparent] w-auto h-6 overflow-hidden shrink-0 flex flex-col items-start justify-end gap-[3px]">
              <div className="relative text-sm font-medium font-poppins text-black text-left">
                SUBSCRIBE
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-[35px] text-center text-black">
        <div className="relative box-border h-px border-t-[1px] border-solid border-gainsboro" />
        <div className="relative">2023 Price Bandit. All rights reverved</div>
      </div>
    </footer>
  );
};

export default Footer;
