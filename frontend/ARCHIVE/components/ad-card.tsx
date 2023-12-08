import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Ad from "./ad";

type AdCardType = {
  /** Style props */
  propTop?: CSSProperties["top"];
};

const AdCard: NextPage<AdCardType> = ({ propTop }) => {
  const ad2Style: CSSProperties = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <a
      className="[text-decoration:none] absolute top-[2090px] left-[0px] w-[1212px] overflow-hidden flex flex-col items-end justify-center"
      style={ad2Style}
    >
      <Ad
        adBannerText="Place your ad here"
        size32050OrientationhorizHeight="116px"
        size32050OrientationhorizPosition="relative"
        size32050OrientationhorizAlignSelf="stretch"
        size32050OrientationhorizTop="unset"
        size32050OrientationhorizLeft="unset"
        size32050OrientationhorizWidth="unset"
        size32050OrientationhorizMarginLeft="unset"
        divBackgroundColor="#61b3ff"
        bTop="1.98%"
      />
    </a>
  );
};

export default AdCard;
