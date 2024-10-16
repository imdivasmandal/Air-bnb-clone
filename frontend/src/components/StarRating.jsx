import React from 'react';

function StarRating({ rating }) {
  
  const totalStars = 5;

  return (

    <div className="rating">
      {Array.from({ length: totalStars }, (v, i) => (
        <input
          key={i}
          type="radio"
          name="rating-2"
          className={`mask mask-star-2 ${i < rating ? 'bg-black-700' : 'bg-gray-300'}`}
          disabled
        />
      ))}
    </div>
  );
}

export default StarRating;
