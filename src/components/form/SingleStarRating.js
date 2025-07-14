import Image from 'next/image';
import React, { useState } from 'react';

const SingleStarRating = ({ value, onChange, name, errors, required = false, label = "Rating" }) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const YellowStar = () => (
    <Image src="/images/star.svg" alt='star' height={20} width={20} unoptimized={true} />
  );

  const GrayStar = () => (
    <Image src="/images/rating-star.svg" alt='star' height={20} width={20} unoptimized={true} />
  );

  const getStarComponent = (starIndex) => {
    const displayValue = hoveredStar || value;
    return starIndex <= displayValue ? <YellowStar /> : <GrayStar />;
  };

  const handleStarClick = (rating) => {
    onChange(rating);
  };

  const handleStarHover = (rating) => {
    setHoveredStar(rating);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Stars Display */}
      <div className="flex justify-start items-center gap-4">
        {stars.map((star) => (
          <div key={star} className="flex flex-col items-center gap-1">
            <div
              className="cursor-pointer select-none hover:scale-110 transition-transform duration-150"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
            >
              {getStarComponent(star)}
            </div>
            <span className="text-sm text-gray-600 select-none">{star}</span>
          </div>
        ))}
      </div>

      {/* Current Selection Display */}
      <div className="mt-2 text-sm text-gray-600">
        {value ? `${value} star${value !== 1 ? 's' : ''} selected` : 'Select a rating'}
      </div>

      {/* Error Message */}
      {errors && errors[name] && (
        <p className="text-red-500 text-sm mt-1">Required</p>
      )}
    </div>
  );
};

export default SingleStarRating;