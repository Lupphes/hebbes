import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Explain from "../components/explain";
import Footer from "../components/footer";
import Header from "../components/header";
import Discounts from "../components/discounts";

const Home: NextPage = () => {
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
      <div className="h-auto bg-red overflow-hidden shrink-0 flex flex-col items-center justify-center gap-[41px] text-left text-29xl text-black font-poppins">
        <Header
            home="Home"
            onHomeClick={onHomeClick}
            onDiscountsClick={onDiscountsClick}
            onAboutClick={onAboutClick}
            onPremiumClick={onPremiumClick}
        />
        <Discounts />
      </div>
      <section className="flex flex-col items-center justify-start">
        <Explain />
        <Footer />
      </section>
    </div>
  );
};

export default Home;
