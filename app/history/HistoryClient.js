"use client";

import { useEffect, useState } from "react";

export default function HistoryClient() {
  const [conversions, setConversions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");

  async function fetchHistory(p = 1, category = "") {
    let url = `/api/conversions?page=${p}`;
    if (category) url += `&category=${category}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setConversions(data.conversions);
      setTotal(data.total);
      setPage(data.page);
    }
  }

  useEffect(() => {
    fetchHistory(1, categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Conversion History</h2>

      {/* Filter */}
      <label className="block mb-2 text-gray-700">Filter by category</label>
      <select
        className="border p-2 rounded mb-4"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="distance">Distance</option>
        <option value="area">Area</option>
        <option value="speed">Speed</option>
        <option value="acceleration">Acceleration</option>
        <option value="temperature">Temperature</option>
      </select>

      {/* History table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Category</th>
            <th className="border p-2">Input</th>
            <th className="border p-2">Output</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {conversions.map((c, i) => (
            <tr key={i}>
              <td className="border p-2">{c.category}</td>
              <td className="border p-2">
                {c.inputValue} {c.fromUnit}
              </td>
              <td className="border p-2">
                {c.outputValue} {c.toUnit}
              </td>
              <td className="border p-2">
                {new Date(c.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => fetchHistory(page - 1, categoryFilter)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => fetchHistory(page + 1, categoryFilter)}
          disabled={page * 10 >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
}
