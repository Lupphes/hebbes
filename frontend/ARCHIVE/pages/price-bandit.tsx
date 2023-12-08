import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import AboutExplain from "../components/about-explain";
import Explain from "../components/explain";
import Footer from "../components/footer";

const PriceBandit: NextPage = () => {
  const router = useRouter();

  const onHomeClick = useCallback(() => {
      router.push("/");
    }, [router]);

    const onDiscountsClick = useCallback(() => {
      router.push("/"); // TODO: change to hot items
    }, [router]);

    const onAboutClick = useCallback(() => {
      router.push("/price-bandit");
    }, [router]);

    const onPremiumClick = useCallback(() => {
      router.push("/price-bandit");
    }, [router]);


  return (
    <div className="relative bg-text-white-op-100 w-full overflow-hidden flex flex-col items-center justify-start gap-[81px]">
      <div className="h-auto overflow-hidden shrink-0 flex flex-col items-center justify-center gap-[41px] text-left text-29xl text-black font-poppins">
        <Header
          home="About"
          onHomeClick={onHomeClick}
          onDiscountsClick={onDiscountsClick}
          onAboutClick={onAboutClick}
          onPremiumClick={onPremiumClick}
        />
      </div>
      <AboutExplain />
      <section className="flex flex-col items-center justify-start">
        <Explain />
        <Footer />
      </section>
    </div>
  );
};

export default PriceBandit;
