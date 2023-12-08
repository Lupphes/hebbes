import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import StoreListingContainer from "@/components/StoreListing";

interface singleStore {
  price: string;
  imageSrc: string;
}
  
interface itemList{
  name: string;
  singleStores: singleStore[];
}

const ProductRow: NextPage<itemList> = ({ singleStores }) => {
  return (
    <div
      className="absolute top-[147px] left-[0px] w-[1212px] overflow-hidden flex flex-col items-start justify-center text-center text-lg text-black font-poppins"
    >
      <div className="self-stretch relative h-[168.6px]">
        <div className="absolute top-[0px] left-[0px] w-[270px] overflow-hidden flex flex-col items-center justify-center text-left text-base">
          <div className="w-[270px] overflow-hidden flex flex-row items-center justify-between">
            <img
              className="relative w-[149px] h-[152.1px] object-cover"
              alt=""
              src="/frame-101@2x.png"
            />
            <div className="w-[121px] h-[167px] overflow-hidden shrink-0 flex flex-col items-center justify-center gap-[12px]">
              <a className="[text-decoration:none] relative text-[inherit] inline-block w-[115px] h-[25.7px] shrink-0">
                Coca Cola 1.5L
              </a>
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover"
                alt=""
                src="/asgaard-sofa-321@2x.png"
              />
            </div>
          </div>
        </div>
        <StoreListingContainer 
          singleStores={singleStores}
        />
      </div>
    </div>
  );
};

export default ProductRow;
