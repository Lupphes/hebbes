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
      <button className="px-2 py-1 border border-gray-300" onClick={handleDecrease}>
        -
      </button>
      <span className="mx-2">{quantity}</span>
      <button className="px-2 py-1 border border-gray-300" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};

export default QuantityAdjuster;