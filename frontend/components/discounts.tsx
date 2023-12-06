// Discounts.tsx
import type { NextPage } from 'next';
import DiscountCard from './discount-card';

const Discounts: NextPage = () => {
  return (
    <div className="w-[1240px] overflow-hidden flex flex-col items-start justify-center text-left text-13xl text-black font-poppins md:w-auto md:[align-self:unset] md:flex-col md:gap-[0px] md:items-center md:justify-center sm:flex-col">
      <div className="w-[1229px] h-[403px] flex flex-col items-center justify-center gap-[27px]">
        <div className="font-medium inline-block h-12 ml-2.5">This Week at Price Bandit!</div>
        <div className="w-[1229px] h-[328px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[41px] text-whitesmoke">
          {/* First Card */}
          <DiscountCard
            title="Big Deals!"
            subtitle="Big Deals!"
            imageUrl="/asgaard-sofa-42@2x.png"
          />
          {/* Middle Card */}
          <DiscountCard
            title="Household Items"
            subtitle="Household Items"
            imageUrl="/frame@3x.png"
          />
          {/* Last Card */}
          <DiscountCard
            title="Family Deals"
            subtitle="Family Deals"
            imageUrl="/frame1@3x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Discounts;
