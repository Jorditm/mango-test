"use client"
import { useState, useRef, useMemo } from "react";
import { findClosestValue } from "@/lib/utils";
import { DEFAULT_MIN, DEFAULT_MAX, DEFAULT_RANGE_VALUES } from "@/lib/constants";
import { RangeProps } from "@/lib/types";


export default function Range({ isArrayMode, min = DEFAULT_MIN, max = min + DEFAULT_MAX, rangeValues = DEFAULT_RANGE_VALUES }: RangeProps) {

  const formatValues = useMemo(() =>
    rangeValues.length > 0 && rangeValues.some(Number.isFinite)
      ? rangeValues.filter(Number.isFinite)
      : DEFAULT_RANGE_VALUES,
    [rangeValues]
  );

  const [minValue, setMinValue] = useState(isArrayMode ? formatValues[0] : min);
  const [maxValue, setMaxValue] = useState(isArrayMode ? formatValues[formatValues.length - 1] : max);

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>, thumb: 'min' | 'max') => {
    const value = e.target.valueAsNumber
    const formattedValue = Math.round((value * 100)) / 100;

    if (thumb === 'min') {
      if (value < 0) { setMinValue(min); return }
      if (value > maxValue) { setMinValue((maxValue - 5)); return }
      setMinValue(formattedValue)
    }


    if (thumb === 'max') {
      if (value > max) { setMaxValue(max); return }
      if (value < 1) { setMaxValue(minValue); return }
      setMaxValue(formattedValue)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, thumb: 'min' | 'max') => {
    const value = e.target.valueAsNumber || 0
    if (thumb === 'min') {
      if (value < min) { setMinValue(min); return }
      setMinValue(value)
    }
    if (thumb === 'max') {
      if (value < minValue) { setMaxValue(minValue + 5); return }
      if (value > max) { setMaxValue(max); return }
      setMaxValue(value)
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, thumb: 'min' | 'max') => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const slider = sliderRef.current;

      if (!slider) return;

      const { left, width } = slider.getBoundingClientRect();
      const position = (clientX - left) / width;

      if (position < -0.1 || position > 1.1) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        return;
      }

      if (!isArrayMode) {
        calculatePositionWithMinMax(position, thumb)
      }

      if (isArrayMode) {
        calculatePositionWithArray(position, thumb)
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const calculatePositionWithMinMax = (position: number, thumb: 'min' | 'max') => {
    if (typeof max === 'undefined' || typeof min === 'undefined') return;
    const range = max - min;
    const valueInRange = position * range + min;
    const foundValue = Math.min(Math.max(valueInRange, min), max);
    const formattedValue = Math.round((foundValue * 100)) / 100;

    if (thumb === 'min' && (foundValue + 10) < maxValue) {
      setMinValue(formattedValue);
    }
    if (thumb === 'max' && (foundValue - 10) > minValue) {
      setMaxValue(formattedValue);
    }
  }


  const calculatePositionWithArray = (position: number, thumb: 'min' | 'max') => {
    const lastValue = formatValues[formatValues.length - 1];
    const minAllowedValue = formatValues[0];
    const maxAllowedValue = lastValue;
    const range = maxAllowedValue - minAllowedValue;

    const rawValue = minAllowedValue + (position * range);
    const closestValue = findClosestValue(rawValue, rangeValues);

    if (thumb === 'min' && closestValue < maxValue) {
      setMinValue(closestValue);
    }

    if (thumb === 'max' && closestValue > minValue) {
      setMaxValue(closestValue);
    }
  }


  return (
    <div className="flex flex-col justify-center items-center w-96 gap-20">
      <div className="flex items-center justify-center gap-4">
        {!isArrayMode ? (<div className="flex items-center gap-2 border p-2 rounded-md">
          <input
            data-testid="min-input"
            type="number"
            className="w-fit max-w-14 h-full text-right rounded-md outline-none ring-0 normal-nums"
            value={minValue}
            onChange={(e) => handleChangeValue(e, 'min')}
            onBlur={(e) => handleBlur(e, 'min')}
            max={max}
            step={0.01}
          />
          <span data-testid="symbol-min">€</span>
        </div>
        ) : (
          <div className="flex items-center gap-2 p-2">
            <label className="w-14 normal-nums" data-testid="min-label">
              {new Intl.NumberFormat("es-ES", { style: 'currency', currency: 'EUR' }).format(minValue)}
            </label>
          </div>
        )}

        <div
          role="range"
          ref={sliderRef}
          className="relative w-40 h-1.5 flex flex-row bg-black rounded-md"
        >
          <div
            data-testid="slider-min"
            style={{
              left: `${isArrayMode ? (((minValue - formatValues[0]) / (formatValues[formatValues.length - 1] - formatValues[0])) * 100) : (minValue < min ? 0 : ((minValue - min) / (max - min) * 100))}%`
            }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full cursor-grab active:cursor-grabbing active:z-10 active:scale-125 hover:scale-125 transition-transform duration-300"
            onMouseDown={(e) => handleMouseDown(e, 'min')}
          />
          <div
            data-testid="slider-max"
            style={{
              left: `${isArrayMode ? (((maxValue - formatValues[0]) / (formatValues[formatValues.length - 1] - formatValues[0])) * 100) : (maxValue < min ? 0 : ((maxValue - min) / (max - min)) * 100)}%`
            }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full cursor-grab active:cursor-grabbing active:z-10 active:scale-125 hover:scale-125 transition-transform duration-300"
            onMouseDown={(e) => handleMouseDown(e, 'max')}
          />
        </div>

        {!isArrayMode ? (
          <div className="flex items-center gap-2 border p-2 rounded-md">
            <input
              data-testid="max-input"
              type="number"
              className=" w-fit max-w-14 h-full text-right outline-none ring-0 normal-nums"
              value={maxValue}
              onChange={(e) => handleChangeValue(e, 'max')}
              onBlur={(e) => handleBlur(e, 'max')}
              min={min}
              step={0.01}
            />
            <span data-testid="symbol-max" >€</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-2 ">
            <label className="w-14 normal-nums" data-testid="max-label">
              {new Intl.NumberFormat("es-ES", { style: 'currency', currency: 'EUR' }).format(maxValue)}
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
