import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Header from '../components/layout/Header.jsx';
import MainDashboard from '../components/layout/MainDashboard.jsx';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Mobile Header */}
            <Header toggleSidebar={toggleSidebar} />

            {/* Sidebar (Pass state/toggle function) */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col pt-16 md:pt-0">
                <MainDashboard />
            </div>
        </div>
    );
};

export default Dashboard;