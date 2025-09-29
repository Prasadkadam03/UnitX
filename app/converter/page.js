"use client";

import { useState } from "react";
import { units, convertValue } from "../../lib/conversions";

export default function ConverterPage() {
  const categories = Object.keys(units);
  const [category, setCategory] = useState("distance");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);

  function handleConvert() {
    if (!inputValue) return;
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;
    const converted = convertValue(category, fromUnit, toUnit, value);
    setResult(converted);
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gray-950 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Unit Converter</h2>

      {/* Category selection */}
      <label className="block mb-2 text-gray-700">Category</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          const firstUnit = Object.keys(units[e.target.value])[0];
          const secondUnit = Object.keys(units[e.target.value])[1];
          setFromUnit(firstUnit);
          setToUnit(secondUnit);
          setResult(null);
        }}
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* From Unit */}
      <label className="block mb-2 text-gray-700">From</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={fromUnit}
        onChange={(e) => setFromUnit(e.target.value)}
      >
        {Object.keys(units[category]).map((u) => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>

      {/* To Unit */}
      <label className="block mb-2 text-gray-700">To</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={toUnit}
        onChange={(e) => setToUnit(e.target.value)}
      >
        {Object.keys(units[category]).map((u) => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>

      {/* Input */}
      <label className="block mb-2 text-gray-700">Value</label>
      <input
        type="number"
        className="w-full border p-2 rounded mb-4"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button
        onClick={handleConvert}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Convert
      </button>

      {/* Result */}
      {result !== null && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-gray-800">
            {inputValue} {fromUnit} ={" "}
            <span className="font-bold">
              {result.toFixed(4)} {toUnit}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
