import React, { useState } from "react";
import { useBankStore } from "../../store/useBankStore";
import { Eye, EyeOff } from 'lucide-react';
import toast from "react-hot-toast";

const Settings = () => {
    const { name, phone, password, image, updateUserInfo } = useBankStore();

    const [updatedName, setUpdatedName] = useState(name);
    const [updatedPhone, setUpdatedPhone] = useState(phone);
    const [updatedPassword, setUpdatedPassword] = useState(password);
    const [updatedImage, setUpdatedImage] = useState(image);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    // ✅ Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setUpdatedImage(reader.result); // Save Base64 string
        };
        reader.readAsDataURL(file);
    };

    // ✅ Save changes
    const handleSave = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        updateUserInfo(updatedName, updatedPhone, updatedPassword, updatedImage);
        setLoading(false)
        toast.success("Profile Updated Successfully...")
    };

    return (
        <div className="px-6 py-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl text-center font-semibold mb-6 text-gray-800">
                Account Settings
            </h2>

            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={updatedImage || "/Images/default-avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                />
                <label className="mt-3 text-sm text-green-600 cursor-pointer hover:underline">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    Upload new picture
                </label>
            </div>

            {/* Name */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
            </label>
            <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />

            {/* Phone */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone
            </label>
            <input
                type="text"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />

            {/* Password */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
            </label>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={updatedPassword}
                    onChange={(e) => setUpdatedPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-6 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer mb-5 inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>


            {/* Save Button */}

            <button
                onClick={handleSave}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-lime-700 hover:bg-lime-800 
            cursor-pointer text-white font-medium px-4 py-2 rounded transition duration-150 
            disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        <span>Processing...</span>
                    </>
                ) : (
                    "Save Changes"
                )}
            </button>

        </div>
    );
};

export default Settings;
