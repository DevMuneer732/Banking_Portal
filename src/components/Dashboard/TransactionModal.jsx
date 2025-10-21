import React, { useState } from "react";
import { useBankStore } from "../../store/useBankStore";

const TransactionModal = ({ isOpen, onClose }) => {
    const { balance, creditMoney, cashOut } = useBankStore();
    const [amount, setAmount] = useState("");
    const [action, setAction] = useState("credit"); // "credit" or "cashout"
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!amount) return;

        let success = false;
        if (action === "credit") success = creditMoney(amount);
        else success = cashOut(amount);

        if (success) {
            setMessage(`✅ Successfully ${action === "credit" ? "added" : "withdrawn"} $${amount}`);
            setAmount("");
        } else {
            setMessage("❌ Invalid amount or insufficient balance");
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose} // click outside to close
        >
            <div
                className="bg-white p-6 rounded w-[90%] max-w-md shadow-2xl border border-gray-100"
                onClick={(e) => e.stopPropagation()} // prevent close on content click
            >
                {/* Header */}
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Manage Balance
                </h2>

                {/* Current Balance */}
                <p className="text-center text-gray-600 mb-4">
                    Current Balance:{" "}
                    <span className="font-semibold text-green-700">
                        ${balance.toFixed(2)}
                    </span>
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-center mb-5">
                    <button
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${action === "credit"
                                ? "bg-green-600 text-white shadow"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        onClick={() => setAction("credit")}
                    >
                        Add Money
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${action === "cashout"
                                ? "bg-red-600 text-white shadow"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        onClick={() => setAction("cashout")}
                    >
                        Cash Out
                    </button>
                </div>

                {/* Input Field */}
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Message */}
                {message && (
                    <p
                        className={`text-center text-sm mb-3 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                {/* Footer Buttons */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        {action === "credit" ? "Add" : "Withdraw"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
