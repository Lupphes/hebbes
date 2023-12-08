import type { NextPage } from "next";

const MainHeader: NextPage = () => {
  return (
    <div className="w-[1440px] h-[100px] flex flex-row items-center justify-end mt-[-100px] text-left text-base text-black font-poppins">
      <div className="relative w-[1440px] h-[100px] overflow-hidden shrink-0">
        <div className="absolute top-[0px] left-[0px] bg-text-white-op-100 w-[1440px] h-[100px]" />
        <div className="absolute top-[37px] left-[45px] w-[424px] h-[26px] overflow-hidden flex flex-col items-center justify-start">
          <div className="relative w-[424px] h-6">
            <div className="absolute top-[0px] left-[349.5px] font-medium inline-block w-[74.5px]">
              Premium
            </div>
            <div className="absolute top-[0px] left-[0px] w-[423px] h-6 overflow-hidden">
              <div className="absolute top-[0px] left-[0px] font-medium inline-block w-[48.3px]">
                Home
              </div>
              <div className="absolute top-[0px] left-[241.7px] font-medium inline-block w-[49.3px]">
                About
              </div>
              <div className="absolute top-[0px] left-[123.9px] font-medium inline-block w-[46.3px]">
                Items
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[844.3px] h-11 overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[56px] ml-[-886px] text-gray">
        <div className="relative left-[0px] w-11 h-[41px] mt-[3px]">
          <div className="absolute top-[0px] left-[0px] rounded-3xs bg-text-white-op-100 box-border w-[703px] h-[41px] border-[1px] border-solid border-darkgray" />
          <img
            className="absolute top-[12px] left-[661px] w-[19px] h-[17px] overflow-hidden"
            alt=""
            src="/akariconssearch.svg"
          />
          <div className="absolute top-[9px] left-[31px] font-medium inline-block w-[444px]">
            Product Searched
          </div>
        </div>
        <img
          className="relative w-[84.7px] h-[42.8px] overflow-hidden shrink-0"
          alt=""
          src="/frame4.svg"
        />
      </div>
    </div>
  );
};

export default MainHeader;
