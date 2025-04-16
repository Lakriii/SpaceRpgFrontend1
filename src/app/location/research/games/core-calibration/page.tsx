'use client';

import React, { useState } from 'react';

interface CoreCalibrationProps {
  maxStability: number;
  maxEnergy: number;
  maxTemperature: number;
}

const CoreCalibration: React.FC<CoreCalibrationProps> = ({ maxStability, maxEnergy, maxTemperature }) => {
  const [stability, setStability] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [temperature, setTemperature] = useState(50);

  const handleChange = (type: string, value: number) => {
    switch (type) {
      case 'stability':
        setStability(value);
        break;
      case 'energy':
        setEnergy(value);
        break;
      case 'temperature':
        setTemperature(value);
        break;
      default:
        break;
    }
  };

  const checkCalibration = () => {
    if (stability >= maxStability * 0.9 && energy >= maxEnergy * 0.9 && temperature <= maxTemperature * 0.8) {
      alert('Perfect calibration! Research completed.');
    } else if (stability < maxStability * 0.5 || energy < maxEnergy * 0.5 || temperature > maxTemperature * 1.2) {
      alert('Calibration failed! System damaged.');
    } else {
      alert('Calibration successful but not optimal.');
    }
  };

  return (
    <div className="core-calibration-container">
      <h2>Core Calibration</h2>
      <div>
        <label>Stability: {stability}</label>
        <input
          type="range"
          min="0"
          max={maxStability}
          value={stability}
          onChange={(e) => handleChange('stability', +e.target.value)}
        />
      </div>
      <div>
        <label>Energy: {energy}</label>
        <input
          type="range"
          min="0"
          max={maxEnergy}
          value={energy}
          onChange={(e) => handleChange('energy', +e.target.value)}
        />
      </div>
      <div>
        <label>Temperature: {temperature}</label>
        <input
          type="range"
          min="0"
          max={maxTemperature}
          value={temperature}
          onChange={(e) => handleChange('temperature', +e.target.value)}
        />
      </div>
      <button onClick={checkCalibration}>Check Calibration</button>
    </div>
  );
};

export default CoreCalibration;
