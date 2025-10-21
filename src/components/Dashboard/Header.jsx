import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm p-4 flex justify-between items-center z-10 md:hidden">
            <h1 className="text-xl font-bold text-gray-800">Banking Dashboard</h1>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-800">
                <Menu size={24} />
            </button>
        </header>
    );
};

export default Header;