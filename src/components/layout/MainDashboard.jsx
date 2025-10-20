import React, { useState } from 'react';
import { Home, Banknote, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';

const MainDashboard = () => {
    // ✅ FIX: Select state and actions individually.
    const balance = useBankStore(state => state.balance);
    const creditMoney = useBankStore(state => state.creditMoney);
    const cashOut = useBankStore(state => state.cashOut);
    
    const [amount, setAmount] = useState('');
    const [actionMessage, setActionMessage] = useState('');

    // Handles Credit Money and Cash Out (CRUD operations)
    const handleAction = (actionType) => {
        const numAmount = parseFloat(amount);
        // ... (rest of handleAction logic remains the same)
        if (isNaN(numAmount) || numAmount <= 0) {
            setActionMessage('Please enter a valid amount.');
            return;
        }

        let success = false;
        if (actionType === 'credit') {
            success = creditMoney(numAmount);
            if (success) {
                setActionMessage(`✅ Successfully credited $${numAmount.toFixed(2)}.`);
            }
        } else if (actionType === 'cashOut') {
            success = cashOut(numAmount);
            if (success) {
                setActionMessage(`✅ Successfully cashed out $${numAmount.toFixed(2)}.`);
            } else {
                setActionMessage('❌ Error: Insufficient funds.');
            }
        }
        
        if (success) {
            setAmount('');
        }

        setTimeout(() => setActionMessage(''), 3000);
    };

    // Dummy data from the portal image
    // const loans = [
    //     { name: 'Family house loan', value: '$-120,000', icon: Home, color: 'blue' },
    //     { name: 'Euretrip loan', value: '$-21,489', icon: Banknote, color: 'green' },
    //     { name: 'Car loan', value: '$-2,312', icon: DollarSign, color: 'yellow' },
    // ];

    const docs = [
        { name: 'ID Card', status: 'Verified', time: '19 May at 2:53 PM' },
        { name: 'Photo with ID Card', status: 'Pending', time: '09 May at 3:22 AM' },
        { name: 'Bank Information', status: 'Verified', time: '07 May at 6:44 PM' },
    ];


    return (
        <main className="flex-1 p-6 md:p-10 bg-gray-50 overflow-y-auto">
            
            {/* Current Account Balance (Main Loan/Balance Display) */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Loans</h2>
                <div className="bg-white p-6 rounded-lg shadow-md max-w-xs border-t-4 border-green-700">
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">${balance.toFixed(2)}</p> 
                    <button className="mt-4 bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800 transition">
                        View details
                    </button>
                </div>
            </div>

            {/* Account Management (Credit/Cash Out) */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Credit / Cash Out</h3>
                
                {actionMessage && (
                    <p className={`mb-4 p-3 rounded text-sm font-medium ${actionMessage.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {actionMessage}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="flex gap-3 pt-7 sm:pt-0 items-end">
                        <button
                            onClick={() => handleAction('credit')}
                            className="flex items-center justify-center w-full sm:w-auto bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                        >
                            <ArrowUp size={18} className="mr-2" /> Credit Money
                        </button>
                        <button
                            onClick={() => handleAction('cashOut')}
                            className="flex items-center justify-center w-full sm:w-auto bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                        >
                            <ArrowDown size={18} className="mr-2" /> Cash Out
                        </button>
                    </div>
                </div>
            </div>


            {/* Loan Summary Cards */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {loans.map((loan, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 border-t-4 border-gray-100">
                        <div className={`p-2 rounded-full w-fit mb-3 ${loan.color === 'blue' ? 'bg-blue-100' : loan.color === 'green' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                            <loan.icon size={20} className={loan.color === 'blue' ? 'text-blue-500' : loan.color === 'green' ? 'text-green-500' : 'text-yellow-500'} />
                        </div>
                        <p className="text-lg font-semibold text-gray-800">{loan.name}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{loan.value}</p>
                        <p className="text-xs text-gray-500 mt-1">Outstanding</p>
                    </div>
                ))}
            </div> */}


            {/* Docs & Statistics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Docs Table */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Docs</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {docs.map((doc, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doc.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.time}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-400">&gt;</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Statistics Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h3>
                    <div className="flex justify-between items-center mb-4 text-xs font-medium text-gray-500">
                        <p className="text-blue-500 font-semibold">$3.430</p>
                        <p className="text-gray-400 font-semibold">$2.430</p>
                    </div>
                    {/* Placeholder for bar chart */}
                    <div className="h-40 flex items-end justify-around p-2 rounded-lg">
                        <div className="w-6 bg-blue-500 h-3/4 rounded-t-sm"></div>
                        <div className="w-6 bg-gray-300 h-1/2 rounded-t-sm"></div>
                        <div className="w-6 bg-blue-500 h-full rounded-t-sm"></div>
                        <div className="w-6 bg-gray-300 h-2/3 rounded-t-sm"></div>
                        <div className="w-6 bg-blue-500 h-1/4 rounded-t-sm"></div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default MainDashboard;