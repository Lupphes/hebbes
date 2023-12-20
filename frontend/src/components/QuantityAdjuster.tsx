// components/QuantityAdjuster.tsx

import React, { useState } from 'react';

interface QuantityAdjusterProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({ quantity, onQuantityChange }) => {
  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button className="h-full w-20 cursor-pointer outline-none py-3" onClick={handleDecrease}>
        <span className="m-auto text-base">−</span>
      </button>
      <span className="mx-2">{quantity}</span>
      <button className="h-full w-20 cursor-pointer py-3" onClick={handleIncrease}>
        <span className="m-auto text-base">+</span>
      </button>
    </div>
  );
};

export default QuantityAdjuster;