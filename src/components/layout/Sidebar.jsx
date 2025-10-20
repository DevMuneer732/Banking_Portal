import React from 'react';
import {
    Banknote, Settings, FileText, HelpCircle, User, LogOut, X
} from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';

const navItems = [
    { name: 'My loans', icon: Banknote, id: 'Loans', active: true },
    { name: 'Settings', icon: Settings, id: 'Settings' },
    { name: 'Forms', icon: FileText, id: 'Forms' },
    { name: 'FAQ', icon: HelpCircle, id: 'FAQ' },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    // Get state and actions from Zustand
    const name = useBankStore(state => state.name);
    const email = useBankStore(state => state.email);
    const balance = useBankStore(state => state.balance);
    // const logout = useBankStore(state => state.logout);
    // Combine user data
    const userData = { name, email };

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 md:hidden "
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar Content */}
            <div
                className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0 w-70 bg-white p-6 transition-transform duration-300 ease-in-out min-h-screen z-30 shadow-xl md:shadow-none border-r border-gray-100`}
            >
                <div className="flex justify-between items-center mb-8 md:mb-12">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-wider">Non-bank</h1>
                    <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-3 pb-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden">
                        <User size={24} className="text-gray-500" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{userData.name}</p>
                        <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav>
                    {navItems.map(item => (
                        <a
                            key={item.name}
                            href="#"
                            className={`flex items-center space-x-3 p-2 rounded-lg transition duration-150 `}
                        >
                            <div className={`p-3 rounded ${item.active ? 'bg-green-900 text-white' : 'bg-zinc-100 text-black'}`}>
                                <item.icon size={18} />
                            </div>
                            <span>{item.name}</span>
                        </a>
                    ))}
                </nav>

                {/* Card/Balance Display */}
                <div className="mt-8 p-4 rounded-lg bg-purple-700/50 text-white shadow-xl">
                    <div className='flex justify-between'>
                        <p className='text-sm opacity-75'>Balance</p>
                        <p className="text-sm font-bold">VISA</p>
                    </div>
                    <p className="text-3xl font-bold mt-2"><span className='text-sm'>$</span>{balance}</p>
                    <p className="text-sm mt-1 opacity-75">******7483</p>
                </div>

                {/* Sign Out Button */}
                {/* <button
                    onClick={logout}
                    className="flex items-center space-x-2 w-full mt-8 p-3 text-red-500 hover:bg-red-50 rounded-lg transition duration-150"
                >
                    <LogOut size={18} transform='180'/>
                    <span>Sign Out</span>
                </button> */}
            </div>
        </>
    );
};

export default Sidebar;