import { useBankStore } from "../../../store/useBankStore";
import { Home, X, User, Mail, DollarSign } from "lucide-react";

const DetailsModal = ({ isOpen, onClose }) => {
    const balance = useBankStore((state) => state.balance);
    const name = useBankStore((state) => state.name);
    const email = useBankStore((state) => state.email);

    // ✅ Don't render anything if modal is not open
    if (!isOpen) return null;

    const DetailItem = ({ label, value, highlight = false, Icon }) => (
        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
            <div className="flex items-center space-x-2">
                {Icon && <Icon size={16} className="text-gray-500" />}
                <span className="text-sm font-medium text-gray-500">{label}</span>
            </div>
            <span
                className={`text-sm font-semibold ${highlight ? "text-lime-700 text-lg" : "text-gray-800"
                    }`}
            >
                {value}
            </span>
        </div>
    );

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75 backdrop-blur-sm p-4"
            onClick={onClose} 
        >
            <div
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                className="bg-white rounded shadow-2xl w-full max-w-lg p-6 sm:p-8 transform transition-all duration-300"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Account Details</h3>
                    <button
                        onClick={onClose}
                        className="p-2 cursor-pointer rounded-full hover:bg-gray-100 transition text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                    <DetailItem label="Account Holder" value={name || "N/A"} Icon={User} />
                    <DetailItem label="Email" value={email || "N/A"} Icon={Mail} />
                    <DetailItem
                        label="Current Balance"
                        value={`$${balance.toFixed(2)}`}
                        highlight
                        Icon={DollarSign}
                    />
                    <DetailItem label="Account Type" value="Saving Account" Icon={Home} />
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t text-center">
                    <button
                        onClick={onClose}
                        className="w-full cursor-pointer py-3 bg-lime-800 text-white font-medium rounded-lg hover:bg-lime-900 transition shadow-lg"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;
