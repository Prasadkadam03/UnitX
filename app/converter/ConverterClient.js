"use client";

import { useState } from "react";
import { units, convertValue } from "../../lib/conversions";

export default function ConverterClient() {
  const categories = Object.keys(units);
  const [category, setCategory] = useState("distance");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  async function handleConvert(val = inputValue, f = fromUnit, t = toUnit) {
    if (!val) return;
    const value = parseFloat(val);
    if (isNaN(value)) return;
    const converted = convertValue(category, f, t, value);
    setResult(converted);

    await fetch("/api/conversions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        fromUnit: f,
        toUnit: t,
        inputValue: value,
        outputValue: converted,
      }),
    });
  }

  function handleSwap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (inputValue) handleConvert(inputValue, toUnit, fromUnit);
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setInputValue(val);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      handleConvert(val);
    }, 500);
    setDebounceTimer(timer);
  }

  const filteredFromUnits = Object.keys(units[category]).filter((u) =>
    u.toLowerCase().includes(searchFrom.toLowerCase())
  );
  const filteredToUnits = Object.keys(units[category]).filter((u) =>
    u.toLowerCase().includes(searchTo.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto max-sm:mx-2 my-10 p-6 bg-gray-900 rounded-xl shadow-lg">
      {/* Categories */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              const [first, second] = Object.keys(units[c]);
              setFromUnit(first);
              setToUnit(second);
              setResult(null);
              setSearchFrom("");
              setSearchTo("");
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${c === category
              ? "bg-gray-800 text-white shadow"
              : "bg-gray-700 text-gray-200 hover:bg-gray-800"
              }`}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-2 bg-gray-800 rounded-xl p-5 shadow-inner">
          <h3 className="text-gray-300 text-sm mb-2">Input</h3>

          <input
            type="number"
            placeholder="Enter value"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-3 mb-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-gray-800 outline-none"
          />

          <input
            type="text"
            placeholder="Search unit..."
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-700 rounded-lg bg-gray-900 text-white outline-none"
          />

          <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-700 bg-gray-900">
            <ul>
              {filteredFromUnits.map((u) => (
                <li
                  key={u}
                  onClick={() => {
                    setFromUnit(u);
                    if (inputValue) handleConvert(inputValue, u, toUnit);
                  }}
                  className={`px-3 py-2 cursor-pointer text-gray-200 text-sm hover:bg-gray-700 transition ${fromUnit === u ? "bg-gray-700 text-white font-semibold" : ""
                    }`}
                >
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center h-2/2 items-center">
          <button
            onClick={handleSwap}
            className="w-16 h-16 rounded-full bg-gray-800 text-white shadow hover:bg-gray-700 flex items-center justify-center transition transform hover:rotate-180"
          >
            ⇄
          </button>
        </div>

        <div className="md:col-span-2 bg-gray-800 rounded-xl p-5 shadow-inner">
          <h3 className="text-gray-300 text-sm mb-2">Output</h3>

          <input
            type="text"
            readOnly
            value={result !== null ? result.toFixed(5) : ""}
            className="w-full p-3 mb-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
          />

          <input
            type="text"
            placeholder="Search unit..."
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-700 rounded-lg bg-gray-00 text-white outline-none"
          />

          <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-700 bg-gray-900">
            <ul>
              {filteredToUnits.map((u) => (
                <li
                  key={u}
                  onClick={() => {
                    setToUnit(u);
                    if (inputValue) handleConvert(inputValue, fromUnit, u);
                  }}
                  className={`px-3 py-2 cursor-pointer text-gray-200 text-sm hover:bg-gray-700 transition ${toUnit === u ? "bg-gray-700 text-white font-semibold" : ""
                    }`}
                >
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Result display */}
      {result !== null && (
        <div className="text-center mt-8 text-lg text-gray-300">
          {inputValue} {fromUnit} ={" "}
          <span className="font-bold text-gray-200">
            {result.toFixed(4)} {toUnit}
          </span>
        </div>
      )}
    </div>
  );
}
