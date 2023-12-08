import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type AdType = {
  adBannerText?: string;

  /** Style props */
  size32050OrientationhorizHeight?: CSSProperties["height"];
  size32050OrientationhorizPosition?: CSSProperties["position"];
  size32050OrientationhorizAlignSelf?: CSSProperties["alignSelf"];
  size32050OrientationhorizTop?: CSSProperties["top"];
  size32050OrientationhorizLeft?: CSSProperties["left"];
  size32050OrientationhorizWidth?: CSSProperties["width"];
  size32050OrientationhorizMarginLeft?: CSSProperties["marginLeft"];
  divBackgroundColor?: CSSProperties["backgroundColor"];
  bTop?: CSSProperties["top"];
};

const Ad: NextPage<AdType> = ({
  adBannerText,
  size32050OrientationhorizHeight,
  size32050OrientationhorizPosition,
  size32050OrientationhorizAlignSelf,
  size32050OrientationhorizTop,
  size32050OrientationhorizLeft,
  size32050OrientationhorizWidth,
  size32050OrientationhorizMarginLeft,
  divBackgroundColor,
  bTop,
}) => {
  const size32050OrientationhorizStyle: CSSProperties = useMemo(() => {
    return {
      height: size32050OrientationhorizHeight,
      position: size32050OrientationhorizPosition,
      alignSelf: size32050OrientationhorizAlignSelf,
      top: size32050OrientationhorizTop,
      left: size32050OrientationhorizLeft,
      width: size32050OrientationhorizWidth,
      marginLeft: size32050OrientationhorizMarginLeft,
    };
  }, [
    size32050OrientationhorizHeight,
    size32050OrientationhorizPosition,
    size32050OrientationhorizAlignSelf,
    size32050OrientationhorizTop,
    size32050OrientationhorizLeft,
    size32050OrientationhorizWidth,
    size32050OrientationhorizMarginLeft,
  ]);

  const divStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: divBackgroundColor,
    };
  }, [divBackgroundColor]);

  const bStyle: CSSProperties = useMemo(() => {
    return {
      top: bTop,
    };
  }, [bTop]);

  return (
    <div
      className="h-[50px] text-left text-17xl text-text-white-op-100 font-nunito self-stretch"
      style={size32050OrientationhorizStyle}
    >
      <div
        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-layout-banner"
        style={divStyle}
      />
      <b className="absolute top-[2%] left-[29.69%] uppercase" style={bStyle}>
        {adBannerText}
      </b>
    </div>
  );
};

export default Ad;
