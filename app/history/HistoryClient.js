"use client";

import { useEffect, useState } from "react";

export default function HistoryClient() {
  const [conversions, setConversions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const lastPage = Math.ceil(total / 10);

  async function fetchHistory(p = 1, category = "") {
    let url = `/api/conversions?page=${p}&limit=10`;
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

  const categories = [
    { label: "All", value: "" },
    { label: "Distance", value: "distance" },
    { label: "Area", value: "area" },
    { label: "Speed", value: "speed" },
    { label: "Acceleration", value: "acceleration" },
    { label: "Temperature", value: "temperature" },
  ];

  return (
    <div
      className="max-w-4xl mx-auto my-10 max-sm:mx-2 p-6 rounded-xl shadow-lg transition-colors duration-300"
      style={{ backgroundColor: "var(--bg2)", color: "var(--fg)" }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
        Conversion History
      </h2>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="mr-4 self-center" style={{ color: "var(--fg)" }}>
          Filter by category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.value}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor:
                categoryFilter === cat.value ? "var(--tab-bg)" : "var(--bg2)",
              color: categoryFilter === cat.value ? "var(--fg)" : "var(--fg)",
            }}
            onClick={() => setCategoryFilter(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto rounded-lg border shadow-inner transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg2)",
          borderColor: "var(--tab-bg)",
        }}
      >
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              {["Category", "Input", "Output", "Date"].map((heading) => (
                <th
                  key={heading}
                  className="p-3 text-left"
                  style={{ color: "var(--fg)" }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conversions.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-4"
                  style={{ color: "var(--fg)" }}
                >
                  No conversions found.
                </td>
              </tr>
            ) : (
              conversions.map((c, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: i % 2 === 0 ? "var(--tab-bg)" : "var(--bg2)",
                    color: "var(--fg)",
                  }}
                >
                  <td className="p-3">{c.category}</td>
                  <td className="p-3">
                    {c.inputValue} {c.fromUnit}
                  </td>
                  <td className="p-3">
                    {c.outputValue} {c.toUnit}
                  </td>
                  <td className="p-3">
                    {new Date(c.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 rounded-lg shadow transition-colors duration-300"
          style={{
            backgroundColor: "var(--tab-bg)",
            color: "var(--fg)",
            opacity: page <= 1 ? 0.5 : 1,
          }}
          onClick={() => fetchHistory(page - 1, categoryFilter)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 rounded-lg shadow transition-colors duration-300"
          style={{
            backgroundColor: "var(--tab-bg)",
            color: "var(--fg)",
            opacity: page >= lastPage ? 0.5 : 1,
          }}
          onClick={() => fetchHistory(page + 1, categoryFilter)}
          disabled={page >= lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
