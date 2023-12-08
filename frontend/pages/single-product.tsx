import type { NextPage } from "next";
import { useCallback } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import HeaderTop from "../components/header-top";
import MainHeader from "../components/main-header";
import SingleProductContainer from "../components/single-product-container";
import Ad from "../components/ad";
import { useRouter } from "next/router";
import Header from "../components/header";
import Explain from "../components/explain";
import Footer from "../components/footer";

const SingleProduct: NextPage = () => {
  const router = useRouter();
  const singleProducts = [
    // your array of products here
    {
      price: "2.55",
      imageSrc: "/asgaard-sofa-312@2x.png",
    },
    {
      price: "2.20",
      imageSrc: "/asgaard-sofa-312@2x.png",
    }];

  const onHomeClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const onDiscountsClick = useCallback(() => {
    router.push("/"); // TODO: change to hot items
  }, [router]);

  const onPremiumClick = useCallback(() => {
    router.push("/price-bandit");
  }, [router]);


  const onAboutClick = useCallback(() => {
    router.push("/price-bandit");
  }, [router]);

  return (
    <div className="bg-text-white-op-100 overflow-hidden flex flex-col items-center justify-start gap-[45px]">
      <Header
        home="Single Product"
        onHomeClick={onHomeClick}
        onDiscountsClick={onDiscountsClick}
        onAboutClick={onAboutClick}
        onPremiumClick={onPremiumClick}
      />
      <div className="flex flex-col items-center justify-start">
        <Ad
          adBannerText="Place your ad here"
          size32050OrientationhorizHeight="116px"
          size32050OrientationhorizPosition="relative"
          size32050OrientationhorizAlignSelf="unset"
          size32050OrientationhorizTop="0px"
          size32050OrientationhorizLeft="unset"
          size32050OrientationhorizWidth="1209px"
          size32050OrientationhorizMarginLeft="63px"
          divBackgroundColor="#61b3ff"
          bTop="1.98%"
        />
        <SingleProductContainer singleProducts={singleProducts}/>
        <Ad
          adBannerText="Place your ad here"
          size32050OrientationhorizHeight="116px"
          size32050OrientationhorizPosition="relative"
          size32050OrientationhorizAlignSelf="unset"
          size32050OrientationhorizTop="0px"
          size32050OrientationhorizLeft="unset"
          size32050OrientationhorizWidth="1209px"
          size32050OrientationhorizMarginLeft="63px"
          divBackgroundColor="#61b3ff"
          bTop="1.98%"
        />
      </div>
      <section className="flex flex-col items-center justify-start">
        <Explain />
        <Footer />
      </section>
    </div>
  );
};

export default SingleProduct;
