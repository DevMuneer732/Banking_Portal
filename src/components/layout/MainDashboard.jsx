import React, { useState } from "react";
import { useBankStore } from "../../store/useBankStore";
import Statistics from "./Statistics";
import DocsTable from "./DocsTable";
import TransactionModal from "./TransactionModal";
import Settings from "./Settings.jsx";

// ✅ Placeholder components for FAQ and LoansPage
// const FAQ = () => (
//     <div className="p-6 bg-white rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
//         <p className="text-gray-600">Coming soon...</p>
//     </div>
// );

// const LoansPage = () => (
//     <div className="p-6 bg-white rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">My Loans</h2>
//         <p className="text-gray-600">Loan details and management will appear here.</p>
//     </div>
// );

const MainDashboard = () => {
    const { currentPage, balance } = useBankStore();
    const [openModal, setOpenModal] = useState(false);

    // Dummy loan data
    const loans = [
        { name: "Family house loan", value: "120,000", path: "/Images/house.png" },
        { name: "Euretrip loan", value: "21,489", path: "/Images/rome.png" },
        { name: "Car loan", value: "2,312", path: "/Images/car.png" },
    ];

    // ✅ Render different pages based on Zustand currentPage
    const renderPage = () => {
        switch (currentPage) {
            case "Settings":
                return <Settings />;
            case "Loans":
                return <LoansPage />;
            case "FAQ":
                return <FAQ />;
            default:
                return (
                    <>
                        <section className="mb-6 bg-white px-6 sm:px-8 py-6 rounded shadow-sm border border-gray-100">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-6">Loans</h2>

                            <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
                                {/* Balance Section */}
                                <div className="flex-1">
                                    <div className="flex flex-col gap-3 text-center lg:text-left">
                                        <p className="text-5xl sm:text-6xl font-bold text-gray-900">
                                            <span className="text-2xl">$</span>
                                            {balance}
                                        </p>
                                        <p className="text-sm text-gray-500 max-w-md mx-auto lg:mx-0">
                                            I tried to reflect that vision within dark spirit to outline that seriousness of intention that bank.
                                        </p>
                                        <button
                                            onClick={() => setOpenModal(true)}
                                            className="w-full lg:w-auto py-3 px-6 bg-green-800 rounded-lg text-white font-medium hover:bg-green-700 transition"
                                        >
                                            View details
                                        </button>
                                    </div>
                                </div>

                                {/* Loans Grid */}
                                <div className="w-full lg:w-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {loans.map((loan, index) => (
                                            <div
                                                key={index}
                                                className="bg-zinc-100 p-5 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200 border border-gray-100 text-center sm:text-left"
                                            >
                                                <div className="bg-zinc-50 inline-block p-3 rounded mb-3">
                                                    <img
                                                        src={loan.path}
                                                        alt={loan.name}
                                                        height={30}
                                                        width={30}
                                                        className="mx-auto sm:mx-0"
                                                    />
                                                </div>
                                                <p className="text-sm font-semibold text-gray-700">{loan.name}</p>
                                                <p className="text-2xl font-bold text-gray-900 mt-4">
                                                    <span className="text-sm">-$</span>
                                                    {loan.value}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">Balancing owing</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Docs & Statistics Section */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="col-span-1 lg:col-span-2">
                                <DocsTable />
                            </div>
                            <div className="col-span-1">
                                <Statistics />
                            </div>
                        </section>

                        {/* Transaction Modal */}
                        <TransactionModal isOpen={openModal} onClose={() => setOpenModal(false)} />
                    </>
                );
        }
    };

    return (
        <main className="flex-1 p-4 sm:p-6 md:p-10 bg-gray-50 overflow-y-auto transition-all duration-300">
            {renderPage()}
        </main>
    );
};

export default MainDashboard;
