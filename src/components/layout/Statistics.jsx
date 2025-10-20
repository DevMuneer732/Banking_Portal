import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const ArrowUp = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-green-500 inline mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);

const ArrowDown = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-red-500 inline mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);

const ExpandIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="21" y1="3" x2="14" y2="10"></line>
    </svg>
);

const Statistics = () => {
    const chartData = [
        { name: "$98", value: 98, isHighest: false },
        { name: "$108", value: 108, isHighest: false },
        { name: "$83", value: 83, isHighest: false },
        { name: "$123", value: 123, isHighest: true },
        { name: "$41", value: 41, isHighest: false },
    ];

    const getBarColor = (d) => (d.isHighest ? "#4a7f4a" : "#E5E7EB");

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 rounded-lg shadow-lg text-xs font-medium">
                    <p className="text-gray-800">
                        Value: <span className="font-bold">${payload[0].value}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded shadow-sm border border-gray-100 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Statistics
                </h3>
                <ExpandIcon className="text-gray-400 cursor-pointer hover:text-gray-600 transition" />
            </div>

            {/* Income / Expense */}
            <div className="grid grid-cols-2 divide-x divide-gray-200 mb-6">
                <div className="text-center sm:text-left">
                    <p className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                        <ArrowUp /> $3,430
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">Income</p>
                </div>
                <div className="text-center pl-4">
                    <p className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                        <ArrowDown /> $2,430
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">Expense</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="flex-1 min-h-[180px] sm:min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                            style={{ fontSize: "10px", color: "#6B7280" }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                        <Bar dataKey="value" barSize={35} radius={[6, 6, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Statistics;
