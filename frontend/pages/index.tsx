import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";
import HomeFrame from "../components/home-frame";
import Explain from "../components/explain";
import Footer from "../components/footer";

const Home: NextPage = () => {
  const router = useRouter();

  const onAboutClick = useCallback(() => {
    router.push("/price-bandit");
  }, [router]);

  const onPremiumClick = useCallback(() => {
    router.push("/price-bandit");
  }, [router]);

  return (
    <div className="relative bg-text-white-op-100 w-full overflow-hidden flex flex-col items-center justify-start gap-[81px]">
      <HomeFrame />
      <section className="w-[1440px] overflow-hidden flex flex-col items-center justify-start">
        <Explain />
        <Footer />
      </section>
    </div>
  );
};

export default Home;
