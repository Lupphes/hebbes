import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type ProductRowContainerType = {
  dimensions?: string;
  productDimensions?: string;
  productDimensions2?: string;
  productDimensionsText?: string;
  productDimensionsCode?: string;
  productDimensionsCode2?: string;

  /** Style props */
  propTop?: CSSProperties["top"];
};

const ProductRowContainer: NextPage<ProductRowContainerType> = ({
  dimensions,
  productDimensions,
  productDimensions2,
  productDimensionsText,
  productDimensionsCode,
  productDimensionsCode2,
  propTop,
}) => {
  const productRow0Style: CSSProperties = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div
      className="absolute top-[147px] left-[0px] w-[1212px] overflow-hidden flex flex-col items-start justify-center text-center text-lg text-black font-poppins"
      style={productRow0Style}
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
        <div className="absolute top-[0px] left-[318px] w-[60.4px] h-[168.6px] overflow-hidden flex flex-col items-center justify-end text-2xs text-darkolivegreen-100">
          <div className="relative w-[60.4px] h-[149.7px]">
            <div className="absolute top-[120.4px] left-[0px] flex items-center justify-center w-[60.3px] h-[29.3px]">
              Deal
            </div>
            <div className="absolute top-[0px] left-[0.4px] rounded-8xs bg-darkolivegreen-100 w-[60px] h-[45.1px] overflow-hidden flex flex-col items-center justify-center">
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover"
                alt=""
                src="/asgaard-sofa-322@2x.png"
              />
            </div>
            <div className="absolute top-[49.7px] left-[0px] w-[60.3px] h-[69.3px] overflow-hidden flex flex-col items-start justify-end text-lg text-black">
              <div className="relative flex items-center justify-center w-[60px] h-[46px] shrink-0">
                € 2.50
              </div>
              <div className="relative text-2xs text-darkolivegreen-100 flex items-center justify-center w-[60.3px] h-[29.3px] shrink-0 mt-[-6px]">
                Cheapest
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[18.8px] left-[410px] w-[60.3px] h-[130.9px] overflow-hidden flex flex-col items-center justify-start text-red">
          <div className="w-[60.3px] h-[113.9px] flex flex-col items-start justify-end gap-[4px]">
            <div className="rounded-8xs bg-silver w-[60px] h-[45.1px] overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover"
                alt=""
                src={dimensions}
              />
            </div>
            <div className="w-[60.3px] h-[64.2px] overflow-hidden shrink-0 flex flex-col items-start justify-end">
              <div className="relative flex items-center justify-center w-[60px] h-[46px] shrink-0">
                -
              </div>
              <div className="relative text-2xs flex items-center justify-center w-[60.3px] h-[19.2px] shrink-0 mt-[-1px]">
                No option
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[18.8px] left-[502px] w-[60.4px] h-[130.9px] overflow-hidden flex flex-col items-center justify-start">
          <div className="w-[60.4px] h-[95.7px] flex flex-col items-start justify-end py-0 pr-[0.3303184509277344px] pl-0 box-border gap-[4px]">
            <div className="rounded-8xs bg-silver w-[60px] h-[45.1px] overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover"
                alt=""
                src={productDimensions}
              />
            </div>
            <div className="relative flex items-center justify-center w-[60px] h-[46px] shrink-0">
              € 2.55
            </div>
          </div>
        </div>
        <div className="absolute top-[18.8px] left-[594px] w-[60.3px] h-[130.9px] overflow-hidden flex flex-col items-center justify-start">
          <div className="w-[60.3px] h-[94.7px] flex flex-col items-start justify-end gap-[3px]">
            <div className="w-[60px] h-[45.1px] overflow-hidden shrink-0 flex flex-col items-center justify-end">
              <img
                className="relative rounded-8xs w-[60px] h-[45.1px]"
                alt=""
                src="/rectangle-422.svg"
              />
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover mt-[-37px]"
                alt=""
                src="/asgaard-sofa-325@2x.png"
              />
            </div>
            <div className="relative flex items-center justify-center w-[60px] h-[46px] shrink-0">
              € 2.55
            </div>
          </div>
        </div>
        <div className="absolute top-[18.8px] left-[686px] w-[60.1px] h-[130.9px] overflow-hidden flex flex-col items-center justify-start">
          <div className="w-[60.1px] h-[94.7px] flex flex-col items-start justify-end py-0 pr-[0.09301376342773438px] pl-0 box-border gap-[3px]">
            <div className="rounded-8xs bg-silver w-[60px] h-[45.1px] overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover"
                alt=""
                src={productDimensions2}
              />
            </div>
            <div className="relative flex items-center justify-center w-[60px] h-[46px] shrink-0">
              € 2.55
            </div>
          </div>
        </div>
        <div className="absolute top-[18.8px] left-[777px] w-[60.5px] h-[130.9px] overflow-hidden flex flex-col items-center justify-start">
          <div className="w-[60.5px] h-[94.7px] flex flex-col items-start justify-end py-0 pr-[0.4743614196777344px] pl-0 box-border gap-[3px]">
            <div className="w-[60px] h-[45.1px] overflow-hidden shrink-0 flex flex-col items-center justify-end">
              <img
                className="relative rounded-8xs w-[60px] h-[45.1px]"
                alt=""
                src="/rectangle-422.svg"
              />
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover mt-[-37px]"
                alt=""
                src="/asgaard-sofa-327@2x.png"
              />
            </div>
            <div className="relative flex items-center justify-center w-[60px] h-[46px] shrink-0">
              € 2.55
            </div>
          </div>
        </div>
        <div className="absolute top-[18.8px] left-[869px] w-[60.1px] h-[130.9px] overflow-hidden flex flex-col items-center justify-start">
          <div className="w-[60.1px] h-[93.7px] flex flex-col items-start justify-end gap-[3px]">
            <div className="rounded-8xs bg-silver w-[60px] h-[45.1px] overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover"
                alt=""
                src={productDimensionsText}
              />
            </div>
            <div className="relative flex items-center justify-center w-[60px] h-[45px] shrink-0">
              € 2.55
            </div>
          </div>
        </div>
        <div className="absolute top-[18.8px] left-[960px] w-[60.3px] h-[130.9px] overflow-hidden flex flex-col items-center justify-start">
          <div className="w-[60.3px] h-[94.7px] flex flex-col items-start justify-end py-0 pr-[0.23730087280273438px] pl-0 box-border gap-[3px]">
            <img
              className="relative w-[60px] h-[45.1px] overflow-hidden shrink-0"
              alt=""
              src="/frame5.svg"
            />
            <div className="relative flex items-center justify-center w-[60px] h-[46px] shrink-0">
              € 2.55
            </div>
          </div>
        </div>
        <div className="absolute top-[16.6px] left-[1144px] w-[63px] h-[135.4px] overflow-hidden flex flex-col items-center justify-start">
          <div className="w-[63px] h-[97px] flex flex-col items-start justify-end py-0 pr-[2.9997520446777344px] pl-0 box-border gap-[6px]">
            <div className="rounded-8xs bg-silver w-[60px] h-[45.1px] overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover"
                alt=""
                src={productDimensionsCode}
              />
            </div>
            <div className="relative flex items-center justify-center w-[60px] h-[45px] shrink-0">
              € 2.55
            </div>
          </div>
        </div>
        <div className="absolute top-[18.8px] left-[1052px] w-[60.4px] h-[130.9px] overflow-hidden flex flex-col items-center justify-start">
          <div className="w-[60.4px] h-[94.7px] flex flex-col items-start justify-end gap-[3px]">
            <div className="rounded-8xs bg-silver w-[60px] h-[45.1px] overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <img
                className="relative w-[43.6px] h-[29.3px] object-cover"
                alt=""
                src={productDimensionsCode2}
              />
            </div>
            <div className="relative flex items-center justify-center w-[60px] h-[46px] shrink-0">
              € 2.55
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRowContainer;
