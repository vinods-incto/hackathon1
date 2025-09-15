"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { RefreshCcw, FileDown, Save } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

const fullYearData = [
    { month: "Jan", Units: 120, Revenue: 4000, Expenses: 2400 },
    { month: "Feb", Units: 90, Revenue: 3000, Expenses: 1500 },
    { month: "Mar", Units: 150, Revenue: 5000, Expenses: 2800 },
    { month: "Apr", Units: 200, Revenue: 7500, Expenses: 3200 },
    { month: "May", Units: 130, Revenue: 6000, Expenses: 3000 },
    { month: "Jun", Units: 170, Revenue: 8000, Expenses: 4000 },
    { month: "Jul", Units: 180, Revenue: 8500, Expenses: 4100 },
    { month: "Aug", Units: 160, Revenue: 7000, Expenses: 3500 },
    { month: "Sep", Units: 190, Revenue: 9000, Expenses: 4500 },
    { month: "Oct", Units: 210, Revenue: 10000, Expenses: 5000 },
    { month: "Nov", Units: 250, Revenue: 12000, Expenses: 6000 },
    { month: "Dec", Units: 300, Revenue: 15000, Expenses: 7000 },
];

export default function Dashboard() {
    const router = useRouter();

    // filter mode: 'range' | 'month' | 'custom'
    const [filterMode, setFilterMode] = useState("range");
    const [timeRange, setTimeRange] = useState("12m");
    const [selectedMonth, setSelectedMonth] = useState("Jan");

    // custom range
    const [startMonth, setStartMonth] = useState("Jan");
    const [endMonth, setEndMonth] = useState("Dec");

    const [sellerData] = useState(fullYearData);
    const [loading, setLoading] = useState(false);
    const [savedReports, setSavedReports] = useState([]);

    // helper month list in canonical order
    const monthsOrder = fullYearData.map((d) => d.month);

    // add Profit field
    const dataWithProfit = sellerData.map((item) => ({
        ...item,
        Profit: item.Revenue - item.Expenses,
    }));

    // Build filteredData based on filterMode including wrap-around support
    const getFilteredData = () => {
        if (filterMode === "range") {
            switch (timeRange) {
                case "3m":
                    return dataWithProfit.slice(-3);
                case "6m":
                    return dataWithProfit.slice(-6);
                case "12m":
                default:
                    return dataWithProfit;
            }
        }

        if (filterMode === "month") {
            return dataWithProfit.filter((d) => d.month === selectedMonth);
        }

        if (filterMode === "custom") {
            const startIndex = monthsOrder.indexOf(startMonth);
            const endIndex = monthsOrder.indexOf(endMonth);

            if (startIndex === -1 || endIndex === -1) return [];

            let rangeMonths = [];
            if (startIndex <= endIndex) {
                // normal slice (e.g., Jan -> Jun)
                rangeMonths = monthsOrder.slice(startIndex, endIndex + 1);
            } else {
                // wrap-around (e.g., Apr -> Jan) => [Apr..Dec] + [Jan..Jan]
                rangeMonths = monthsOrder.slice(startIndex).concat(monthsOrder.slice(0, endIndex + 1));
            }

            // map month names to data objects, preserving the computed order
            return rangeMonths
                .map((m) => dataWithProfit.find((d) => d.month === m))
                .filter(Boolean);
        }

        return dataWithProfit;
    };

    const filteredData = getFilteredData();

    const handleLogout = () => {
        setLoading(true);
        // show loader then go to home (simulate)
        setTimeout(() => {
            router.push("/");
        }, 600);
    };

    // CSV export
    const exportCSV = () => {
        const headers = ["Month", "Units", "Revenue", "Expenses", "Profit"];
        const rows = filteredData.map((d) => [d.month, d.Units, d.Revenue, d.Expenses, d.Profit]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((r) => r.join(",")).join("\n");
        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = "seller-report.csv";
        link.click();
        toast.success("📄 CSV exported!");
    };

    // PDF export (simple table)
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text("Seller Report", 14, 16);

        // add a little subtitle describing the filter
        const subtitle = filterMode === "range"
            ? `Range: ${timeRange === "3m" ? "Last 3 months" : timeRange === "6m" ? "Last 6 months" : "Last 12 months"}`
            : filterMode === "month"
                ? `Month: ${selectedMonth}`
                : `Custom: ${startMonth} → ${endMonth}${monthsOrder.indexOf(startMonth) > monthsOrder.indexOf(endMonth) ? " (wraps year)" : ""}`;

        doc.setFontSize(10);
        doc.text(subtitle, 14, 24);

        autoTable(doc, {
            startY: 28,
            head: [["Month", "Units", "Revenue", "Expenses", "Profit"]],
            body: filteredData.map((d) => [d.month, d.Units, d.Revenue, d.Expenses, d.Profit]),
            styles: { fontSize: 9 },
            headStyles: { fillColor: [59, 130, 246] }, // blue header
        });

        doc.save("seller-report.pdf");
        toast.success("📄 PDF exported!");
    };

    const saveReport = () => {
        const newReport = {
            id: Date.now(),
            filterMode,
            timeRange,
            selectedMonth,
            startMonth,
            endMonth,
            data: filteredData,
        };
        setSavedReports((s) => [...s, newReport]);
        toast.success("📄 Saved Successfully!");
    };

    if (loading) return <Loader />;

    // convenience flags for UI hints
    const startIndex = monthsOrder.indexOf(startMonth);
    const endIndex = monthsOrder.indexOf(endMonth);
    const wrapsYear = filterMode === "custom" && startIndex > endIndex;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white overflow-hidden">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">🛒 Cito Seller Dashboard</h1>
                    <p className="text-gray-400">Live analytics of sales, profit & spending</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="cursor-pointer bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium px-4 py-2 rounded-lg backdrop-blur-sm transition"
                >
                    Logout
                </button>
            </header>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center space-x-3">
                    <select value={filterMode} onChange={(e) => setFilterMode(e.target.value)} className="bg-slate-700 text-white px-3 py-2 rounded-lg">
                        <option value="range">Range</option>
                        <option value="month">Single Month</option>
                        <option value="custom">Custom Range</option>
                    </select>

                    {filterMode === "range" && (
                        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="bg-slate-700 text-white px-3 py-2 rounded-lg">
                            <option value="3m">Last 3 Months</option>
                            <option value="6m">Last 6 Months</option>
                            <option value="12m">Last 12 Months</option>
                        </select>
                    )}

                    {filterMode === "month" && (
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="bg-slate-700 text-white px-3 py-2 rounded-lg">
                            {monthsOrder.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    )}

                    {filterMode === "custom" && (
                        <div className="flex items-center space-x-2">
                            <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className="bg-slate-700 text-white px-3 py-2 rounded-lg">
                                {monthsOrder.map((m) => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <span className="text-sm text-gray-300">to</span>
                            <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)} className="bg-slate-700 text-white px-3 py-2 rounded-lg">
                                {monthsOrder.map((m) => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    )}
                </div>

                {/* Report actions */}
                <div className="flex items-center space-x-3">
                    <button onClick={saveReport} className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer">
                        <Save className="w-4 h-4 mr-2" /> Save
                    </button>
                    <button onClick={exportCSV} className="flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer">
                        <FileDown className="w-4 h-4 mr-2" /> CSV
                    </button>
                    <button onClick={exportPDF} className="flex items-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg cursor-pointer">
                        <FileDown className="w-4 h-4 mr-2" /> PDF
                    </button>
                </div>
            </div>

            {/* hint for wrap-around custom ranges */}
            {filterMode === "custom" && (
                <p className="text-sm text-gray-300 mb-4">
                    Showing range: <span className="font-medium">{startMonth}</span> → <span className="font-medium">{endMonth}</span>
                    {wrapsYear ? <span className="ml-2 text-xs text-yellow-300">(wraps year)</span> : null}
                </p>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Revenue/Expenses/Profit */}
                <motion.section whileHover={{ scale: 1.02 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Revenue, Expenses & Profit</h2>
                        <RefreshCcw className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" onClick={() => window.location.reload()} />
                    </div>
                    {filteredData.length === 0 ? (
                        <div className="text-gray-300">No data for selected range.</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filteredData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Revenue" fill="#3b82f6" />
                                <Bar dataKey="Expenses" fill="#ef4444" />
                                <Bar dataKey="Profit" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </motion.section>

                {/* Units & Profit Trend */}
                <motion.section whileHover={{ scale: 1.02 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Units Sold & Profit Trend</h2>
                    {filteredData.length === 0 ? (
                        <div className="text-gray-300">No data for selected range.</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={filteredData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Units" stroke="#f59e0b" strokeWidth={3} />
                                <Line type="monotone" dataKey="Profit" stroke="#10b981" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </motion.section>
            </div>
        </div>
    );
}
