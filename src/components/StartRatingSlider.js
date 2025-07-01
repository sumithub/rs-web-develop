import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const StarRangeSlider = () => {
  const [value, setValue] = useState([3, 4]);
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);

  const stars = [1, 2, 3, 4, 5];

  const YellowStar = () => (
    <Image src="/images/star.svg" alt='star' height={20} width={20} unoptimized={true} />
  );

  const GrayStar = () => (
    <Image src="/images/rating-star.svg" alt='star' height={20} width={20} unoptimized={true} />
  );

  const getStarComponent = (starIndex) => {
    const [min, max] = value;
    if (starIndex >= min && starIndex <= max) {
      return <YellowStar />;
    }
    return <GrayStar />;
  };

  const getPositionFromValue = (val) => {
    return ((val - 1) / 4) * 100;
  };

  const getValueFromPosition = (clientX) => {
    if (!sliderRef.current) return 1;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(percentage * 4) + 1;
  };

  const handleMouseDown = (e, handle) => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleMouseMove = (e) => {
    if (isDragging === null) return;

    const newValue = getValueFromPosition(e.clientX);

    if (isDragging === 'min') {
      setValue([Math.min(newValue, value[1]), value[1]]);
    } else if (isDragging === 'max') {
      setValue([value[0], Math.max(newValue, value[0])]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleTrackClick = (e) => {
    if (isDragging !== null) return;

    const newValue = getValueFromPosition(e.clientX);
    const [min, max] = value;

    // Determine which handle is closer and move it
    const distToMin = Math.abs(newValue - min);
    const distToMax = Math.abs(newValue - max);

    if (distToMin <= distToMax) {
      setValue([Math.min(newValue, max), max]);
    } else {
      setValue([min, Math.max(newValue, min)]);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, value]);

  return (
    <div className="w-[80%]">
      <div className="relative">

        {/* Custom Range Slider */}
        <div
          ref={sliderRef}
          className="relative h-6 cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Track */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-[#F6F8FB] rounded-full">
            {/* Active Range */}
            <div
              className="h-full bg-primary rounded-full absolute transition-all duration-150"
              style={{
                left: `${getPositionFromValue(value[0])}%`,
                width: `${getPositionFromValue(value[1]) - getPositionFromValue(value[0])}%`
              }}
            />
          </div>

          {/* Min Handle */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-border-color rounded-full cursor-grab transition-transform duration-150 ${isDragging === 'min' ? 'scale-110 cursor-grabbing' : 'hover:scale-105'
              }`}
            style={{ left: `${getPositionFromValue(value[0])}%` }}
            onMouseDown={(e) => handleMouseDown(e, 'min')}
          />

          {/* Max Handle */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-border-color rounded-full cursor-grab  transition-transform duration-150 ${isDragging === 'max' ? 'scale-110 cursor-grabbing' : 'hover:scale-105'
              }`}
            style={{ left: `${getPositionFromValue(value[1])}%` }}
            onMouseDown={(e) => handleMouseDown(e, 'max')}
          />
        </div>

        {/* Stars Display */}
        <div className="flex justify-between items-center mt-4 px-2">
          {stars.map((star) => (
            <div key={star} className="flex gap-1 items-center">
              <div
                className="cursor-pointer select-none"
                onClick={() => {
                  // Click on star to set range
                  const [min, max] = value;
                  if (star < min) {
                    setValue([star, max]);
                  } else if (star > max) {
                    setValue([min, star]);
                  }
                }}
              >
                {getStarComponent(star)}
              </div>
              <span className="text-sm font-medium mt-1 select-none">{star}</span>
            </div>
          ))}
        </div>

        {/* Value Display
        <div className="mt-4 text-center text-sm text-gray-600">
          Selected Range: {value[0]} - {value[1]} stars
        </div> */}
      </div>
    </div>
  );
};

export default StarRangeSlider;