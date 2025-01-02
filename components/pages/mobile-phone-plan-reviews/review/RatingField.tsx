import React from 'react';

interface RatingFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
}

const RatingField: React.FC<RatingFieldProps> = ({ label, name, value, onChange }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-sm text-white">{label}</span>
      <div className="rating flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <input
            key={`${name}-${star}`}
            type="radio"
            name={name}
            className="mask mask-star-2 bg-[#F6642D]"
            value={star}
            checked={value === star}
            onChange={() => onChange(name, star)}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingField;
