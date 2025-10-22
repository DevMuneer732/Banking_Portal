import React from "react";
import { X } from "lucide-react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white w-[90%] sm:w-[400px] rounded shadow-lg p-6 relative">
                {/* Close (X) button */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                {/* Modal Content */}
                <div className="text-center mt-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Confirm Logout
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Are you sure you want to log out of your account?
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={onClose}
                            className=" cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="cursor-pointer px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
