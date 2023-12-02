import type { NextPage } from "next";

const Discounts: NextPage = () => {
  return (
    <div className="w-[1240px] overflow-hidden flex flex-col items-start justify-center text-left text-13xl text-black font-poppins md:w-auto md:[align-self:unset] md:flex-col md:gap-[0px] md:items-center md:justify-center sm:flex-col">
      <div className="w-[1229px] h-[403px] flex flex-col items-center justify-center gap-[27px]">
        <div className="font-medium inline-block h-12 ml-2.5">
          This Week at Price Bandit!
        </div>
        <div className="w-[1229px] h-[328px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[41px] text-whitesmoke">
          <div className="relative w-[382px] h-[328px]">
            <div className="absolute top-[0px] left-[0px] w-[382px] h-[328px] overflow-hidden flex flex-col items-start justify-end">
              <div className="relative rounded-3xs bg-silver w-[381.8px] h-[328px]" />
              <img
                className="relative rounded-3xs w-[382px] h-[328px] object-cover mt-[-328px]"
                alt=""
                src="/asgaard-sofa-42@2x.png"
              />
            </div>
            <div className="absolute top-[0px] left-[116px] w-40 h-20 overflow-hidden flex flex-col items-start justify-end py-0 pr-0 pl-px box-border">
              <div className="font-medium inline-block w-[77px] mt-[29px]">
                Big Deals!
              </div>
              <div className="font-medium text-black inline-block w-20 mt-8">
                Big Deals!
              </div>
            </div>
          </div>
          <div className="rounded-3xs w-[382px] flex flex-col items-start justify-end text-black">
            <div className="self-stretch relative rounded-3xs bg-silver h-[328px] overflow-hidden shrink-0" />
            <div className="self-stretch relative rounded-3xs h-[328px] overflow-hidden shrink-0 bg-[url('/frame@3x.png')] bg-cover bg-no-repeat bg-[top] mt-[-328px]">
              <div className="absolute top-[241px] left-[51px] w-[280px] overflow-hidden flex flex-col items-end justify-center">
                <div className="relative font-medium">Household Items</div>
              </div>
              <div className="absolute top-[238px] left-[50px] w-[282px] overflow-hidden flex flex-col items-end justify-center text-whitesmoke">
                <div className="relative font-medium">Household Items</div>
              </div>
            </div>
          </div>
          <div className="rounded-3xs bg-silver w-[381.8px] flex flex-col items-end justify-center">
            <div className="self-stretch relative rounded-3xs h-[328px] overflow-hidden shrink-0 bg-[url('/frame1@3x.png')] bg-cover bg-no-repeat bg-[top]">
              <div className="absolute top-[29px] left-[89px] font-medium">
                Family Deals
              </div>
              <div className="absolute top-[32px] left-[88px] font-medium text-black">
                Family Deals
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
