import React, { useState } from "react";
import { useBankStore } from "../../store/useBankStore.js";
import Statistics from "./Statistics.jsx";
import DocsTable from "./DocsTable.jsx";
import TransactionModal from "./Modal/TransactionModal.jsx";
import Settings from "./Settings.jsx";
import Forms from "./Forms.jsx";
import FAQ from "./FAQ.jsx";
import DetailsModal from "./Modal/DetailsModal.jsx";
import { ArrowLeftRight, LogOut } from 'lucide-react';
import LogoutModal from "./Modal/LogoutModal.jsx";
import toast from "react-hot-toast";

const MainDashboard = () => {
    const { currentPage, balance, logout } = useBankStore();
    const [openModal, setOpenModal] = useState(false);
    const [openTransactionModal, setOpenTransactionModal] = useState(false);
    const [openLogoutModal, setOpenLogoutModal] = useState(false)

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
                        <main>
                            <div className="flex justify-end mb-4 gap-5">
                                <button
                                    onClick={() => setOpenTransactionModal(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-lime-800 text-white font-medium rounded shadow-sm cursor-pointer
            hover:bg-lime-700 transition-all duration-200 active:scale-[0.98]"
                                >
                                    <ArrowLeftRight size={18} />
                                    Transactions
                                </button>
                                <button
                                    onClick={() => setOpenLogoutModal(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 border-1 border-red-600 text-red-600 font-medium rounded shadow-sm cursor-pointer
            hover:bg-red-50 transition-all duration-200 active:scale-[0.98]"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                            <div className="mb-6 bg-white px-8 sm:px-10 py-8 rounded shadow-sm border border-gray-100">
                                {/* Header */}
                                <div className="mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700">Loans</h2>
                                </div>

                                {/* Content Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                                    {/* Balance Section (smaller width on large screens) */}
                                    <div className="col-span-1 md:col-span-2 lg:col-span-1 px-2">
                                        <div className="flex flex-col gap-6 text-center lg:text-left">
                                            <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-wider">
                                                <span className="text-2xl">$</span>
                                                {balance.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-500 max-w-md mx-auto lg:mx-0">
                                                I tried to reflect that vision within dark spirit to outline that seriousness of intention that bank.
                                            </p>

                                            {/* ✅ Responsive Button */}
                                            <button
                                                onClick={() => setOpenModal(true)}
                                                className="w-full cursor-pointer sm:w-auto py-2.5 sm:py-3 px-6 sm:px-6 bg-lime-800 text-gray-50/90 font-medium rounded shadow-sm 
                       hover:bg-lime-700 transition duration-200 mx-auto lg:mx-0 active:scale-[0.98]"
                                            >
                                                View details
                                            </button>
                                        </div>
                                    </div>


                                    {/* Loans Section (larger width) */}
                                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                                            {loans.map((loan, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-zinc-100 p-5 sm:p-6 rounded shadow-sm hover:shadow-md transition duration-200 border border-gray-100 text-center sm:text-left"
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

                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* DocsTable - Takes more width on larger screens */}
                                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                                    <DocsTable />
                                </div>

                                {/* Statistics - Moves below on small screens */}
                                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                    <Statistics />
                                </div>
                            </section>
                        </main>
                        {/* Docs & Statistics Section */}

                        {/* Transaction Modal */}

                        {/* <TransactionModal isOpen={openModal} onClose={() => setOpenModal(false)} /> */}
                        <TransactionModal isOpen={openTransactionModal} onClose={() => setOpenTransactionModal(false)} />
                        <DetailsModal isOpen={openModal} onClose={() => setOpenModal(false)} />
                        <LogoutModal
                            isOpen={openLogoutModal}
                            onClose={() => setOpenLogoutModal(false)}
                            onConfirm={() => {
                                logout(); 
                                toast.success("Logout Successfully...")
                                setOpenLogoutModal(false);
                            }}
                        />
                    </>
                );
        }
    };

    return (
        <main className="flex-1 p-2 sm:p-3 md:p-4 pt-[5.5rem] sm:pt-[5rem] md:pt-[2rem] bg-gray-50 overflow-y-auto transition-all duration-300 h-full">
            {renderPage()}
        </main>

    );
};

export default MainDashboard;

