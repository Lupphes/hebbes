import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Header from "./header";

const SearchHeader: NextPage = () => {
  const router = useRouter();

  const onAbout1Click = useCallback(() => {
    router.push("/price-bandit");
  }, [router]);

  const onPremium1Click = useCallback(() => {
    router.push("/price-bandit");
  }, [router]);

  return (
    <div className="absolute top-[0px] left-[0px] w-[1440px] overflow-hidden flex flex-col items-center justify-start text-center text-17xl text-darkolivegreen-100 font-poppins">
      <Header
        home="Search"
        frameWidth="unset"
        frameAlignSelf="stretch"
        frameOverflow="hidden"
        framePosition="unset"
        frameTop="unset"
        frameLeft="unset"
        rectangleIconWidth="1440px"
        rectangleIconHeight="322px"
        onAboutClick={onAbout1Click}
        onPremiumClick={onPremium1Click}
      />
      <div className="self-stretch flex flex-col items-center justify-start">
        <div className="self-stretch relative">
          Showing results for “Coca-Cola”
        </div>
        <div className="self-stretch overflow-hidden flex flex-col items-end justify-center text-lg text-black">
          <div className="self-stretch relative">
            Let us do the job for you: add the item to your cart and we select
            the cheapest price. If you want a specific store, you can still
            select it on your cart or going in the single product details.
          </div>
        </div>
      </div>
      <div className="self-stretch bg-darkolivegreen-300 flex flex-row items-center justify-between pt-[22px] px-[98px] pb-[23px] box-border w-auto h-auto gap-[31px] text-left text-xl text-black hover:bg-darkolivegreen-300 hover:flex hover:self-stretch hover:w-auto hover:h-auto hover:flex-row hover:gap-[31px] hover:items-center hover:justify-between hover:pt-[22px] hover:px-[98px] hover:pb-[23px] hover:box-border lg:flex-row lg:gap-[31px] lg:items-start lg:justify-start md:flex-row md:gap-[0px] md:items-start md:justify-start sm:flex-col sm:gap-[0px] sm:items-start sm:justify-start">
        <div className="w-[85px] h-[30px] flex flex-row items-center justify-start gap-[12px]">
          <img
            className="relative w-[25px] h-[25px] overflow-hidden shrink-0"
            alt=""
            src="/systemuiconsfiltering.svg"
          />
          <div className="relative">Filter</div>
        </div>
        <div className="w-[1126px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[446px] text-base">
          <div className="flex-1 flex flex-row items-center justify-between pt-[7px] px-0 pb-1.5">
            <div className="relative box-border w-0.5 h-[39px] border-r-[2px] border-solid border-darkgray" />
            <div className="relative">Showing 1–10 of 32 results</div>
          </div>
          <div className="flex-1 overflow-hidden flex flex-row items-center justify-between text-xl">
            <div className="w-[126px] h-[55px] flex flex-row items-center justify-start gap-[17px]">
              <div className="relative">Show</div>
              <div className="bg-text-white-op-100 w-[55px] h-[55px] flex flex-col items-center justify-center text-darkgray">
                <div className="relative">10</div>
              </div>
            </div>
            <div className="w-72 flex flex-row items-center justify-between">
              <div className="relative">Sort by</div>
              <li className="bg-text-white-op-100 w-[188px] h-[55px] flex flex-col items-start justify-center py-0 px-[30px] box-border text-darkgray">
                <div className="relative">Default</div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
