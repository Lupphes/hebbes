// Discounts.tsx
import type { NextPage } from 'next';
import DiscountCard from './discount-card';

const Discounts: NextPage = () => {
  return (
    <div className="w-[1240px] overflow-hidden flex flex-col
                    items-start justify-center text-left text-13xl
                    text-black font-poppins
                    lg:flex-col lg:items-center lg:justify-center
                    md:w-auto md:flex-col md:items-center
                    sm:flex-col">
      <div className="w-full h-auto flex flex-col items-center justify-center gap-[27px]">
        <div className="font-medium inline-block h-12 ml-2.5">This Week at Price Bandit!</div>
        <div className="w-full h-auto overflow-hidden shrink-0 flex flex-row items-center
                        justify-center
                        lg:h-auto lg:flex-row lg:gap-[3px] lg:items-center lg:justify-center
                        md:flex-col md:gap-[3px] md:items-center md:justify-center
                        text-whitesmoke">
          {/* First Card */}
          <DiscountCard
            title="Big Deals!"
            subtitle="Big Deals!"
            imageUrl="/frame1@3x.png"
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
