import React, { useState } from "react";
import { X } from "lucide-react"; // icon for close
import { useBankStore } from "../../../store/useBankStore";
import toast from "react-hot-toast";

const TransactionModal = ({ isOpen, onClose }) => {
    const { balance, creditMoney, cashOut } = useBankStore();
    const [amount, setAmount] = useState("");
    const [action, setAction] = useState("credit");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!amount) return;

        let success = false;
        if (action === "credit") success = creditMoney(amount);
        else success = cashOut(amount);

        if (success) {
            toast.success(`Successfully ${action === "credit" ? "added" : "withdrawn"} $${amount}`)
            setAmount("");
        } else {
            toast.error("Invalid amount or insufficient balance")
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
        >
            <div
                className="bg-white relative p-6 rounded w-[90%] max-w-md shadow-2xl border border-gray-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top-right Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition cursor-pointer"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Manage Balance
                </h2>

                {/* Current Balance */}
                <p className="text-center text-gray-600 mb-4">
                    Current Balance:{" "}
                    <span className="font-semibold text-lime-700">
                        ${balance}
                    </span>
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-center mb-5">
                    <button
                        className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition-all ${action === "credit"
                            ? "bg-lime-700 text-white shadow"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        onClick={() => setAction("credit")}
                    >
                        Add Money
                    </button>
                    <button
                        className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition-all ${action === "cashout"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-lime-700"
                />
                {/* Submit Button */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSubmit}
                        className=" cursor-pointer px-6 py-2 bg-lime-700 text-white rounded-lg hover:bg-lime-800 transition"
                    >
                        {action === "credit" ? "Add" : "Withdraw"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
