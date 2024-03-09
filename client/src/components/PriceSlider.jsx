import React, { useState, useEffect } from 'react';
import Slider from 'react-slider';
import "./priceSlider.css"

const PriceSlider = ({ max, min, onChange }) => {
  const [values, setValues] = useState([min, max]);

  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  const handleChange = (newValues) => {
    setValues(newValues);
    onChange(newValues);
  }

  return (
    <div className="mt-4">
      <Slider
        className="slider w-full"
        thumbClassName="thumb"
        value={values}
        onChange={handleChange}
        onAfterChange={handleChange}
        min={min}
        max={max}
      />
      <div className="flex justify-between mt-2">
        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm text-gray-600">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            value={values[0]}
            onChange={(e) => handleChange([+e.target.value, values[1]])}
            className="w-20 py-1 px-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
        {values[1] === 10000 && <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm text-gray-600">Max Price:</label>
          <input
            type="text"
            id="maxPrice"
            value="10000+"
            disabled
            onChange={(e) => handleChange([values[0], +e.target.value])}
            className="w-20 py-1 px-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>}
        {values[1] < 10000 && <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm text-gray-600">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            value={values[1]}
            onChange={(e) => handleChange([values[0], +e.target.value])}
            className="w-20 py-1 px-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>}
      </div>
    </div>
  );
};

export default PriceSlider;
