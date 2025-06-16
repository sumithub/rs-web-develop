import React, { useState, useRef, useCallback } from 'react';
import { Star } from 'lucide-react';

const StarRatingSlider = () => {
  const [rating, setRating] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const updateRating = useCallback((clientX) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newRating = Math.round(percentage * 4) + 1; // Convert to 1-5 range
    setRating(newRating);
  }, []);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    updateRating(e.clientX);
  }, [updateRating]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      updateRating(e.clientX);
    }
  }, [isDragging, updateRating]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    updateRating(e.touches[0].clientX);
  }, [updateRating]);

  const handleTouchMove = useCallback((e) => {
    if (isDragging) {
      e.preventDefault();
      updateRating(e.touches[0].clientX);
    }
  }, [isDragging, updateRating]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">Rate Your Experience</h2>
        
        {/* Star Rating Display */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="flex flex-col items-center">
              <Star
                size={32}
                className={`${
                  star <= rating 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'fill-gray-200 text-gray-300'
                } transition-all duration-300 cursor-pointer hover:scale-110`}
                onClick={() => setRating(star)}
              />
              <span className="mt-2 text-sm font-medium text-gray-600">
                {star}
              </span>
            </div>
          ))}
        </div>

        {/* Custom Range Slider */}
        <div className="mb-6">
          <div 
            ref={sliderRef}
            className="relative h-3 bg-gray-200 rounded-full cursor-pointer select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Progress Track */}
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-200"
              style={{ width: `${((rating - 1) / 4) * 100}%` }}
            />
            
            {/* Slider Thumb */}
            <div 
              className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-grab transition-all duration-200 hover:scale-110 ${
                isDragging ? 'scale-110 cursor-grabbing shadow-xl' : ''
              }`}
              style={{ left: `calc(${((rating - 1) / 4) * 100}% - 12px)` }}
            />

            {/* Tick marks */}
            <div className="absolute top-full mt-2 w-full flex justify-between px-3">
              {[1, 2, 3, 4, 5].map((tick) => (
                <div
                  key={tick}
                  className={`w-0.5 h-2 rounded-full transition-colors duration-200 ${
                    tick <= rating ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Rating Display */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Rating: <span className="text-blue-600 font-bold">{rating} out of 5</span>
          </p>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-md font-semibold mb-3 text-center">Quick Select</h3>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => setRating(value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                rating === value
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarRatingSlider;