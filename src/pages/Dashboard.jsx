import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar.jsx';
import Header from '../components/Dashboard/Header.jsx';
import MainDashboard from '../components/Dashboard/MainDashboard.jsx';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen flex bg-gray-100 overflow-hidden">

            {/* Sidebar - Fixed on left for desktop */}
            <div className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Mobile Sidebar (drawer-style) */}
            <div className="md:hidden">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col md:ml-64">
                {/* Header always visible on mobile */}
                <Header toggleSidebar={toggleSidebar} />

                {/* Scrollable main area */}
                <div className="flex-1 overflow-y-auto">
                    <MainDashboard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
