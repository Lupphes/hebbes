import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Header from "./header";
import Discounts from "./discounts";

const HomeFrame: NextPage = () => {
  const router = useRouter();

  const onAboutClick = useCallback(() => {
    router.push("/price-bandit");
  }, [router]);

  const onPremiumClick = useCallback(() => {
    router.push("/price-bandit");
  }, [router]);

  return (
    <div className="w-[1440px] h-[860px] overflow-hidden shrink-0 flex flex-col items-center justify-center gap-[41px] text-left text-29xl text-black font-poppins">
      <Header
        home="Home"
        onAboutClick={onAboutClick}
        onPremiumClick={onPremiumClick}
      />
      <Discounts />
    </div>
  );
};

export default HomeFrame;
