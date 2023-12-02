import type { NextPage } from "next";
import Ad from "./ad";

const SingleProductContainer: NextPage = () => {
  return (
    <div className="relative w-[1440px] h-[674px] overflow-hidden shrink-0 text-left text-base text-black font-poppins">
      <div className="absolute top-[0px] left-[0px] bg-text-white-op-100 w-[1440px] h-[616px]" />
      <div className="absolute top-[174px] left-[99px] h-[500px] flex flex-row items-start justify-start">
        <div className="w-[423px] h-[500px] flex flex-col items-center justify-start">
          <div className="relative rounded-3xs bg-darkolivegreen-300 w-[423px] h-[500px]" />
          <img
            className="relative w-[423px] h-[500px] object-cover mt-[-500px]"
            alt=""
            src="/asgaard-sofa-3@2x.png"
          />
        </div>
        <div className="relative w-[816px] h-[482px]">
          <div className="absolute top-[0px] left-[1.3px] w-[791.7px] h-[99px] overflow-hidden text-5xl">
            <div className="absolute top-[0px] left-[0px] text-23xl inline-block w-[420.5px]">
              Coca-Cola 1.5L
            </div>
            <div className="absolute top-[63px] left-[102.7px] font-medium text-darkolivegreen-100 inline-block w-[123px]">
              Best Price
            </div>
            <img
              className="absolute top-[68px] left-[245.7px] w-[39px] h-[26px] object-cover"
              alt=""
              src="/asgaard-sofa-31@2x.png"
            />
            <div className="absolute top-[63px] left-[0px] font-medium inline-block w-[102.1px]">
              € 2.50
            </div>
            <div className="absolute top-[63px] left-[555.7px] font-medium text-darkolivegreen-100 text-right inline-block w-[236px]">
              Avg Historical Price
            </div>
            <div className="absolute top-[63px] left-[453.7px] font-medium text-darkgray text-center inline-block w-[102.1px]">
              € 2.52
            </div>
          </div>
          <div className="absolute top-[422px] left-[9px] w-[419px] h-[60px] overflow-hidden text-darkgray">
            <div className="absolute top-[0px] left-[144px] inline-block w-[275px]">
              Soft Drinks
            </div>
            <div className="absolute top-[36px] left-[144px] inline-block w-[275px]">
              Soft Drinks, Coca-Cola
            </div>
            <div className="absolute top-[0px] left-[122.3px] w-[5.4px] h-[60px]">
              <div className="absolute top-[0px] left-[0px] font-medium inline-block w-[5.4px]">
                :
              </div>
              <div className="absolute top-[36px] left-[0px] font-medium inline-block w-[5.4px]">
                :
              </div>
            </div>
            <div className="absolute top-[0px] left-[0px] inline-block w-[100.8px]">
              Category
            </div>
            <div className="absolute top-[36px] left-[0px] inline-block w-[52.4px]">
              Tags
            </div>
          </div>
          <div className="absolute top-[301px] left-[0px] w-[301px] overflow-hidden flex flex-col items-end justify-center text-darkgray">
            <div className="w-[292px] h-[46px] flex flex-row items-center justify-end gap-[1px]">
              <div className="relative inline-block w-[198px] shrink-0">
                Quantity
              </div>
              <div className="relative w-[93px] h-[46px] overflow-hidden shrink-0 text-black">
                <div className="absolute top-[0px] left-[0px] rounded-3xs bg-text-white-op-100 box-border w-[93px] h-[46px] border-[1px] border-solid border-darkgray" />
                <div className="absolute top-[14.4px] left-[11.3px] inline-block w-[6.8px] h-[17.3px]">
                  -
                </div>
                <div className="absolute top-[14.4px] left-[75.6px] inline-block w-[8.3px] h-[17.3px]">
                  +
                </div>
                <div className="absolute top-[14.4px] left-[44.6px] font-medium inline-block w-[4.5px] h-[17.3px]">
                  1
                </div>
              </div>
            </div>
          </div>
          <img
            className="absolute top-[394px] left-[0px] w-[812.9px] h-px"
            alt=""
            src="/group.svg"
          />
          <div className="absolute top-[115px] left-[0px] w-[816px] h-[175px] flex flex-row items-center justify-start gap-[28px] text-center text-smi">
            <div className="w-[57.8px] h-[175px] overflow-hidden shrink-0 flex flex-col items-center justify-start gap-[8px] text-left text-sm text-darkgray">
              <div className="relative inline-block w-[57.8px] h-[22.3px] shrink-0">
                Shops
              </div>
              <div className="w-[55.7px] h-[144.2px] flex flex-col items-start justify-end pt-0 pb-[0.0000152587890625px] pr-[0.09039306640625px] pl-0 box-border gap-[1px] text-center text-2xs text-darkolivegreen-100">
                <div className="relative w-[55.3px] h-[43.4px] overflow-hidden shrink-0">
                  <div className="absolute top-[0px] left-[0px] rounded-8xs bg-darkolivegreen-100 w-[55.3px] h-[43.4px]" />
                  <img
                    className="absolute top-[7.6px] left-[7.9px] w-[40.1px] h-[28.2px] object-cover"
                    alt=""
                    src="/asgaard-sofa-32@2x.png"
                  />
                </div>
                <div className="relative w-[55.6px] h-[99.1px] overflow-hidden shrink-0">
                  <div className="absolute top-[0px] left-[0px] text-smi text-black flex items-center justify-center w-[55.6px] h-[28.2px]">
                    € 2.50
                  </div>
                  <div className="absolute top-[20.9px] left-[0px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                    Cheapest
                  </div>
                  <div className="absolute top-[70.9px] left-[0px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                    Deal
                  </div>
                  <img
                    className="absolute top-[45.2px] left-[8.3px] w-[40.1px] h-[28.2px] object-cover"
                    alt=""
                    src="/asgaard-sofa-33@2x.png"
                  />
                </div>
              </div>
            </div>
            <div className="w-[55.6px] h-[118.5px] flex flex-col items-start justify-end pt-0 px-0 pb-[0.00005340576171875px] box-border gap-[1px] text-red">
              <div className="w-[55.3px] h-[43.4px] overflow-hidden shrink-0 flex flex-col items-center justify-end">
                <div className="relative rounded-8xs bg-silver w-[55.3px] h-[43.4px]" />
                <img
                  className="relative w-[40.1px] h-[28.2px] object-cover mt-[-35px]"
                  alt=""
                  src="/asgaard-sofa-34@2x.png"
                />
              </div>
              <div className="relative w-[55.6px] h-[73.5px] overflow-hidden shrink-0">
                <div className="absolute top-[0px] left-[0px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                  -
                </div>
                <div className="absolute top-[27px] left-[0px] text-2xs flex items-center justify-center w-[55.6px] h-[18.4px]">
                  No option
                </div>
                <img
                  className="absolute top-[45.3px] left-[8.3px] w-[40.1px] h-[28.2px] object-cover"
                  alt=""
                  src="/asgaard-sofa-35@2x.png"
                />
              </div>
            </div>
            <div className="relative w-[55.9px] h-[116.6px]">
              <div className="absolute top-[45px] left-[0.3px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                € 2.55
              </div>
              <img
                className="absolute top-[88.3px] left-[7.7px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-36@2x.png"
              />
              <div className="absolute top-[0px] left-[0px] w-[55.3px] h-[43.4px] overflow-hidden">
                <div className="absolute top-[0px] left-[0px] rounded-8xs bg-silver w-[55.3px] h-[43.4px]" />
                <img
                  className="absolute top-[7.6px] left-[7.9px] w-[40.1px] h-[28.2px] object-cover"
                  alt=""
                  src="/asgaard-sofa-37@2x.png"
                />
              </div>
            </div>
            <div className="relative w-[55.6px] h-[116.6px]">
              <img
                className="absolute top-[0px] left-[0.2px] rounded-8xs w-[55.3px] h-[43.4px]"
                alt=""
                src="/rectangle-42.svg"
              />
              <div className="absolute top-[43.1px] left-[0px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                € 2.55
              </div>
              <img
                className="absolute top-[7.6px] left-[8.1px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-38@2x.png"
              />
              <img
                className="absolute top-[88.3px] left-[7.4px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-39@2x.png"
              />
            </div>
            <div className="relative w-[55.7px] h-[116.6px]">
              <div className="absolute top-[0px] left-[0px] rounded-8xs bg-silver w-[55.3px] h-[43.4px]" />
              <div className="absolute top-[43.1px] left-[0.1px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                € 2.55
              </div>
              <img
                className="absolute top-[7.6px] left-[7.9px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-310@2x.png"
              />
              <img
                className="absolute top-[88.3px] left-[7.5px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-311@2x.png"
              />
            </div>
            <div className="relative w-14 h-[116.6px]">
              <img
                className="absolute top-[0px] left-[0px] rounded-8xs w-[55.3px] h-[43.4px]"
                alt=""
                src="/rectangle-421.svg"
              />
              <div className="absolute top-[43.1px] left-[0.5px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                € 2.55
              </div>
              <img
                className="absolute top-[7.6px] left-[7.9px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-312@2x.png"
              />
              <img
                className="absolute top-[88.3px] left-[7.8px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-313@2x.png"
              />
            </div>
            <div className="relative w-[55.6px] h-[116.6px]">
              <div className="absolute top-[44px] left-[0px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                € 2.55
              </div>
              <img
                className="absolute top-[88.3px] left-[8.3px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-314@2x.png"
              />
              <div className="absolute top-[0px] left-[0.1px] w-[55.3px] h-[43.4px] overflow-hidden">
                <div className="absolute top-[0px] left-[0px] rounded-8xs bg-silver w-[55.3px] h-[43.4px]" />
                <img
                  className="absolute top-[7.6px] left-[7.9px] w-[40.1px] h-[28.2px] object-cover"
                  alt=""
                  src="/asgaard-sofa-315@2x.png"
                />
              </div>
            </div>
            <div className="relative w-[55.8px] h-[116.6px]">
              <img
                className="absolute top-[0px] left-[0px] rounded-8xs w-[55.3px] h-[43.4px]"
                alt=""
                src="/rectangle-421.svg"
              />
              <div className="absolute top-[43.1px] left-[0.3px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                € 2.55
              </div>
              <div className="absolute top-[7.6px] left-[7.9px] w-[40.1px] h-[28.2px]">
                <div className="absolute top-[0px] left-[0px] w-[40.1px] h-[28.2px]" />
                <img
                  className="absolute top-[0px] left-[0px] w-[40.1px] h-[28.2px] object-cover"
                  alt=""
                  src="/asgaard-sofa-43@2x.png"
                />
              </div>
              <img
                className="absolute top-[88.3px] left-[7.6px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-316@2x.png"
              />
            </div>
            <div className="relative w-[55.6px] h-[116.6px]">
              <img
                className="absolute top-[88.3px] left-[8.3px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-317@2x.png"
              />
              <div className="absolute top-[0px] left-[0px] w-[55.6px] h-[71.3px] overflow-hidden">
                <div className="absolute top-[0px] left-[0.3px] rounded-8xs bg-silver w-[55.3px] h-[43.4px]" />
                <div className="absolute top-[43.1px] left-[0px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                  € 2.55
                </div>
                <img
                  className="absolute top-[7.6px] left-[8.2px] w-[40.1px] h-[28.2px] object-cover"
                  alt=""
                  src="/asgaard-sofa-318@2x.png"
                />
              </div>
            </div>
            <div className="relative w-14 h-[118.7px]">
              <div className="absolute top-[46.4px] left-[0px] flex items-center justify-center w-[55.6px] h-[28.2px]">
                € 2.55
              </div>
              <img
                className="absolute top-[90.5px] left-[8.1px] w-[40.1px] h-[28.2px] object-cover"
                alt=""
                src="/asgaard-sofa-319@2x.png"
              />
              <div className="absolute top-[0px] left-[0.7px] w-[55.3px] h-[43.4px] overflow-hidden">
                <div className="absolute top-[0px] left-[0px] rounded-8xs bg-silver w-[55.3px] h-[43.4px]" />
                <img
                  className="absolute top-[7.6px] left-[7.9px] w-[40.1px] h-[28.2px] object-cover"
                  alt=""
                  src="/asgaard-sofa-320@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Ad
        adBannerText="Place your ad here"
        size32050OrientationhorizHeight="116px"
        size32050OrientationhorizPosition="absolute"
        size32050OrientationhorizAlignSelf="unset"
        size32050OrientationhorizTop="0px"
        size32050OrientationhorizLeft="147px"
        size32050OrientationhorizWidth="1209px"
        size32050OrientationhorizMarginLeft="unset"
        divBackgroundColor="#61b3ff"
        bTop="1.98%"
      />
    </div>
  );
};

export default SingleProductContainer;
