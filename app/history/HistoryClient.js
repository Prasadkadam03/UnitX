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

    return (
        <div className="max-w-4xl mx-auto my-10 max-sm:mx-2 p-6 bg-gray-900 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">Conversion History</h2>

            {/* Filter */}
            <div className="mb-6 flex flex-wrap gap-2">
                <span className="text-gray-300 mr-4 self-center">Filter by category:</span>
                {[
                    { label: "All", value: "" },
                    { label: "Distance", value: "distance" },
                    { label: "Area", value: "area" },
                    { label: "Speed", value: "speed" },
                    { label: "Acceleration", value: "acceleration" },
                    { label: "Temperature", value: "temperature" },
                ].map((cat) => (
                    <button
                        key={cat.value}
                        className={`px-4 py-2 rounded-lg transition-colors
                            ${categoryFilter === cat.value
                                ? "bg-gray-700 text-white font-bold"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
                        `}
                        onClick={() => setCategoryFilter(cat.value)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800 shadow-inner">
                <table className="w-full border-collapse min-w-[600px] text-white">
                    <thead>
                        <tr className="bg-gray-900 text-left">
                            <th className="p-3">Category</th>
                            <th className="p-3">Input</th>
                            <th className="p-3">Output</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conversions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center p-4 text-gray-400">
                                    No conversions found.
                                </td>
                            </tr>
                        ) : (
                            conversions.map((c, i) => (
                                <tr
                                    key={i}
                                    className={`text-white ${i % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}`}
                                >
                                    <td className="p-3">{c.category}</td>
                                    <td className="p-3">{c.inputValue} {c.fromUnit}</td>
                                    <td className="p-3">{c.outputValue} {c.toUnit}</td>
                                    <td className="p-3">{new Date(c.timestamp).toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between mt-6">
                <button
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 disabled:opacity-50"
                    onClick={() => fetchHistory(page - 1, categoryFilter)}
                    disabled={page <= 1}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 disabled:opacity-50"
                    onClick={() => fetchHistory(page + 1, categoryFilter)}
                    disabled={page >= lastPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
