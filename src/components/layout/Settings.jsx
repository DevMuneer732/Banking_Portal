import React, { useState } from 'react';
import { useBankStore } from '../../store/useBankStore';

const Settings = () => {
    const { name, email } = useBankStore();
    
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedEmail, setUpdatedEmail] = useState(email);
    const [message, setMessage] = useState('');

    const handleSave = () => {
        localStorage.setItem(
            'user_bank_account',
            JSON.stringify({
                ...JSON.parse(localStorage.getItem('user_bank_account') || '{}'),
                name: updatedName,
                email: updatedEmail,
            })
        );
        setMessage('✅ Settings updated successfully!');
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />

            <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-150"
            >
                Save Changes
            </button>

            {message && <p className="text-green-600 mt-3 text-sm">{message}</p>}
        </div>
    );
};

export default Settings;
