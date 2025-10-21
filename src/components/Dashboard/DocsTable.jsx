import React from "react";
import { ChevronRight } from "lucide-react";

const docs = [
    { name: "ID Card", status: "Verified", time: "19 May at 2:53 PM" },
    { name: "Photo with ID Card", status: "Declined", time: "09 May at 3:22 AM" },
    { name: "Bank Information", status: "Waiting", time: "07 May at 6:44 PM" },
    { name: "IBANK", status: "Declined", time: "07 May at 6:44 PM" },
    { name: "Registration", status: "Verified", time: "07 May at 6:44 PM" },
];

const getStatusClasses = (status) => {
    switch (status) {
        case "Verified":
            return "bg-green-50 text-green-700 border border-green-100";
        case "Declined":
            return "bg-red-50 text-red-700 border border-red-100";
        case "Waiting":
            return "bg-yellow-50 text-yellow-700 border border-yellow-100";
        default:
            return "bg-gray-50 text-gray-700 border border-gray-100";
    }
};

const DocsTable = () => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 tracking-tight">
                Documents
            </h3>

            {/* Responsive Scroll Wrapper */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] sm:min-w-[450px] md:min-w-[500px] text-sm text-left">
                    <thead>
                        <tr className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider border-b border-gray-200">
                            <th className="py-3 pl-0 pr-2 font-medium whitespace-nowrap">Name</th>
                            <th className="py-3 px-2 font-medium whitespace-nowrap">Status</th>
                            <th className="py-3 px-2 font-medium whitespace-nowrap">Time</th>
                            <th className="py-3 px-2 w-6"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {docs.map((doc, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* Name */}
                                <td className="py-3 pr-2 pl-0 whitespace-nowrap text-gray-700 font-medium">
                                    <div className="flex items-center gap-3 min-w-[120px]">
                                        <img
                                            src="/Images/pdf.png"
                                            alt="pdf"
                                            className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
                                        />
                                        <p className="text-sm truncate max-w-[140px] sm:max-w-[200px]">
                                            {doc.name}
                                        </p>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="py-3 px-2 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-md ${getStatusClasses(
                                            doc.status
                                        )}`}
                                    >
                                        {doc.status}
                                    </span>
                                </td>

                                {/* Time */}
                                <td className="py-3 px-2 text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                                    {doc.time}
                                </td>

                                {/* Arrow */}
                                <td className="py-3 px-2 text-gray-400">
                                    <ChevronRight size={18} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocsTable;
