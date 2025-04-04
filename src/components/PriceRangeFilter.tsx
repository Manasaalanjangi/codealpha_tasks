
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { priceRanges } from '../data/products';

type PriceRangeFilterProps = {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
};

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ 
  priceRange, 
  onPriceRangeChange 
}) => {
  const handleRangeClick = (min: number, max: number) => {
    onPriceRangeChange([min, max]);
  };

  const handleSliderChange = (value: number[]) => {
    onPriceRangeChange([value[0], value[1]]);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Price Range</h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {priceRanges.map((range, index) => (
          <button
            key={index}
            onClick={() => handleRangeClick(range.min, range.max)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              priceRange[0] === range.min && priceRange[1] === range.max
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {range.name}
          </button>
        ))}
      </div>
      
      <div className="px-2">
        <Slider
          defaultValue={[0, 1000]}
          min={0}
          max={1000}
          step={10}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handleSliderChange}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
