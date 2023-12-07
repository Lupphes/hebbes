import type { NextPage } from "next";
import { useCallback } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Header from "../components/header";
import RegisterForm from "../components/register-form";

const Registration: NextPage = () => {
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
    <div className="relative bg-text-white-op-100 w-full overflow-hidden flex flex-col items-center justify-start">
      <Header
        home="Register"
        onHomeClick={onHomeClick}
        onDiscountsClick={onDiscountsClick}
        onAboutClick={onAboutClick}
        onPremiumClick={onPremiumClick}
      />
      <RegisterForm />
      <section className="self-stretch overflow-hidden flex flex-col items-center justify-start text-left text-13xl text-black font-poppins">
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
                      onClick={onAbout1Click}
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
    </div>
  );
};

export default Registration;
