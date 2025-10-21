import React, { useState } from "react";
import { useBankStore } from "../../store/useBankStore.js";
import Statistics from "./Statistics.jsx";
import DocsTable from "./DocsTable.jsx";
import TransactionModal from "./TransactionModal.jsx";
import Settings from "./Settings.jsx";
import Forms from "./Forms.jsx";
import FAQ from "./FAQ.jsx";
import DetailsModal from "./DetailsModal.jsx";
import { ArrowLeftRight, LogOut } from 'lucide-react';

const MainDashboard = () => {
    const { currentPage, balance, logout } = useBankStore();
    const [openModal, setOpenModal] = useState(false);
    const [openTransactionModal, setOpenTransactionModal] = useState(false)

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
            case "Forms":
                return <Forms />;
            case "FAQ":
                return <FAQ />;
            default:
                return (
                    <>
                        <main className="">
                            <div className="mb-6 bg-white px-4 sm:px-6 py-6 rounded shadow-lg border border-gray-100 ">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-6">Loans</h2>
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        {/* Transactions Button */}
                                        <button
                                            onClick={() => setOpenTransactionModal(true)}
                                            className="flex items-center gap-2 px-4 py-2.5 bg-green-900 text-white font-medium rounded-lg shadow-sm 
                                hover:bg-green-800 transition-all duration-200 active:scale-[0.98]"
                                        >
                                            <ArrowLeftRight size={18} />
                                            Transactions
                                        </button>

                                        {/* Sign Out Button */}
                                        {/* <button
                                            onClick={logout}
                                            className="flex items-center gap-2 px-4 py-2.5 border border-red-400 text-red-600 font-medium 
                                rounded-lg bg-white shadow-sm hover:bg-red-50 hover:text-red-700 
                                transition-all duration-200 active:scale-[0.98]"
                                        >
                                            <LogOut size={18} />
                                            Sign Out
                                        </button> */}
                                    </div>

                                </div>

                                <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
                                    {/* Balance Section */}
                                    <div className="flex-1">
                                        <div className="flex flex-col gap-6 text-center lg:text-left">
                                            <p className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-wider">
                                                <span className="text-2xl">$</span>
                                                {balance}
                                            </p>
                                            <p className="text-sm text-gray-500 max-w-md mx-auto lg:mx-0">
                                                I tried to reflect that vision within dark spirit to outline that seriousness of intention that bank.
                                            </p>
                                            <button
                                                onClick={() => setOpenModal(true)}
                                                className="py-2 px-2 bg-green-800 rounded text-white font-medium hover:bg-green-700 transition"
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
                                                    <p className="text-2xl font-bold text-gray-900 mt-6">
                                                        <span className="text-sm">-$</span>
                                                        {loan.value}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">Balancing owing</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="col-span-1 lg:col-span-2">
                                    <DocsTable />
                                </div>
                                <div className="col-span-1">
                                    <Statistics />
                                </div>
                            </section>
                        </main>
                        {/* Docs & Statistics Section */}

                        {/* Transaction Modal */}

                        {/* <TransactionModal isOpen={openModal} onClose={() => setOpenModal(false)} /> */}
                        <TransactionModal isOpen={openTransactionModal} onClose={() => setOpenTransactionModal(false)} />
                        <DetailsModal isOpen={openModal} onClose={() => setOpenModal(false)} />
                    </>
                );
        }
    };

    return (
        <main className="flex-1 p-3 sm:p-5 md:p-6 pt-[5.5rem] sm:pt-[5rem] md:pt-[3rem] bg-gray-50 overflow-y-auto transition-all duration-300">
            {renderPage()}
        </main>

    );
};

export default MainDashboard;

