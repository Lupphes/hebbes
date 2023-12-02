import type { NextPage } from "next";

const HeaderTop: NextPage = () => {
  return (
    <div className="relative w-[1440px] h-[100px] text-left text-base text-darkgray font-poppins">
      <div className="absolute top-[0px] left-[0px] bg-text-white-op-100 w-[1440px] h-[100px]" />
      <div className="absolute top-[38px] left-[99px] w-[82px] h-6 flex flex-row items-center justify-start gap-[14px]">
        <div className="relative">Home</div>
        <img
          className="relative w-5 h-5 overflow-hidden shrink-0"
          alt=""
          src="/dashiconsarrowupalt2.svg"
        />
      </div>
      <div className="absolute top-[31px] left-[312px] w-[153px] h-[37px] flex flex-row items-center justify-start pt-1.5 px-0 pb-[7px] box-border gap-[34px] text-black">
        <div className="relative box-border w-0.5 h-[39px] border-r-[2px] border-solid border-darkgray" />
        <div className="relative">Coca-Cola 1.5L</div>
      </div>
      <div className="absolute top-[38px] left-[205px] w-[82px] h-6 flex flex-row items-center justify-start gap-[21px]">
        <div className="relative">Shop</div>
        <img
          className="relative w-5 h-5 overflow-hidden shrink-0"
          alt=""
          src="/dashiconsarrowupalt2.svg"
        />
      </div>
    </div>
  );
};

export default HeaderTop;
