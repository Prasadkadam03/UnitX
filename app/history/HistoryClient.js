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
        <div className="max-w-3xl mx-auto mt-10 max-sm:mx-2 bg-gray-900 shadow rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Conversion History</h2>

            <label className="block mb-2 text-gray-300">Filter by category</label>
            <select
                className="border p-2 rounded mb-4 bg-gray-800"
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
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="border p-2 text-left">Category</th>
                            <th className="border p-2 text-left">Input</th>
                            <th className="border p-2 text-left">Output</th>
                            <th className="border p-2 text-left">Date</th>
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
                                <tr key={i} className="odd:bg-gray-800 even:bg-gray-700 text-white">
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
                <button
                    className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
                    onClick={() => fetchHistory(page - 1, categoryFilter)}
                    disabled={page <= 1}
                >
                    Previous
                </button>
                <button
                    className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
                    onClick={() => fetchHistory(page + 1, categoryFilter)}
                    disabled={page * 10 >= total}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
