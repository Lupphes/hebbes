// DiscountCard.tsx
import React from 'react';

interface DiscountCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative w-[382px] h-[328px]">
      <div className="absolute top-[0px] left-[0px] w-[382px] h-[328px] overflow-hidden flex flex-col items-start justify-end">
        <div className="relative rounded-3xs bg-silver w-[381.8px] h-[328px]" />
        <img
          className="relative rounded-3xs w-[382px] h-[328px] object-cover mt-[-328px]"
          alt=""
          src={imageUrl}
        />
      </div>
      <div className="absolute top-[0px] left-[116px] w-40 h-20 overflow-hidden flex flex-col items-start justify-end py-0 pr-0 pl-px box-border">
        <div className="font-medium inline-block w-[77px] mt-[29px]">{title}</div>
        <div className="font-medium text-black inline-block w-20 mt-8">{subtitle}</div>
      </div>
    </div>
  );
};

export default DiscountCard;
