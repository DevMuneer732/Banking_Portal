import React, { useCallback } from 'react';
import { Banknote, Settings, FileText, HelpCircle, X } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';
import useIsMobile from '../../hooks/useIsMobile';

const menuItems = [
    { name: 'My loans', icon: Banknote, id: 'Loans' },
    { name: 'Settings', icon: Settings, id: 'Settings' },
    { name: 'Forms', icon: FileText, id: 'Forms' },
    { name: 'FAQ', icon: HelpCircle, id: 'FAQ' },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { currentPage, setCurrentPage, name, balance, phone, image } = useBankStore();

    const isMobile = useIsMobile();

    const handleSelect = useCallback(
        (id) => {
            setCurrentPage(id);
            if (isMobile && typeof toggleSidebar === 'function') toggleSidebar();
        },
        [isMobile, setCurrentPage, toggleSidebar]
    );

    return (
        <>
            {/* Mobile overlay for small screens */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={toggleSidebar} aria-hidden="true" />
            )}

            <aside
                className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-full md:w-64 bg-white p-6 transition-transform duration-300 ease-in-out h-screen z-30 shadow-xl md:shadow-none border-r border-gray-100 flex flex-col`}
                aria-label="Primary sidebar"
            >
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-wider">Non-bank</h1>
                    <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-800" aria-label="Close sidebar">
                        <X size={22} />
                    </button>
                </div>

                {/* User profile */}
                <div className="flex items-center space-x-3 pb-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden">
                        <img src={image || '/Images/default-avatar.png'} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{name}</p>
                        <p className="text-sm text-gray-500 truncate">{phone}</p>
                    </div>
                </div>

                {/* Navigation - scrollable area */}
                <nav className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2" role="navigation" aria-label="Sidebar menu">
                    <ul className="space-y-1">
                        {menuItems.map((item, index) => {
                            const isActive = currentPage === item.id;
                            const Icon = item.icon;
                            return (
                                <li key={`${item.id}-${index}`}>
                                    <button
                                        onClick={() => handleSelect(item.id)}
                                        className={`flex items-center space-x-3 w-full text-left p-2 rounded-lg transition duration-150 cursor-pointer ${
                                            isActive ? 'bg-green-50 text-green-800' : 'text-gray-600 hover:bg-zinc-50'
                                        }`}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        <div className={`p-3 rounded ${isActive ? 'bg-green-800 text-white' : 'bg-zinc-100 text-black'}`}>
                                            <Icon size={18} />
                                        </div>
                                        <p className="font-semibold truncate">{item.name}</p>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Balance card pinned to bottom */}
                <footer className="mt-auto">
                    <div className="p-4 rounded-lg bg-purple-700/60 text-white shadow-xl">
                        <div className="flex justify-between">
                            <p className="text-sm opacity-90">Balance</p>
                            <p className="text-sm font-bold">VISA</p>
                        </div>
                        <p className="text-3xl font-bold">
                            <span className="text-sm align-end mr-1">$</span>
                            {balance}
                        </p>
                        <p className="text-sm mt-1 opacity-90">******7483</p>
                    </div>
                </footer>
            </aside>
        </>
    );
};

export default Sidebar;
