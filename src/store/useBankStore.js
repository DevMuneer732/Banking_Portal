import { create } from "zustand";

const STORAGE_KEY = "user_bank_account";
const AUTH_KEY = "isLoggedIn";
const SIGNUP_KEY = "signup-credentials";
const DEFAULT_AVATAR = "/Images/person.png"

const getInitialState = () => {
    if (typeof window === "undefined")
        return {
            isLoggedIn: false,
            // users:[],
            balance: 6202.0,
            email: "",
            name: "John",
            phone: "",
            password: "",
            image: DEFAULT_AVATAR,
            currentPage: "Loans",
        };

    const storedBankData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const storedAuth = localStorage.getItem(AUTH_KEY) === "true";
    const storedCredentials = JSON.parse(localStorage.getItem(SIGNUP_KEY) || "{}");

    return {
        isLoggedIn: storedAuth,
        balance: storedBankData.balance ?? 6202.0,
        email: storedBankData.email || storedCredentials.email || "",
        name: storedBankData.name || storedCredentials.name || "John",
        phone: storedBankData.phone || storedCredentials.phone || "",
        password: storedBankData.password || storedCredentials.password || "",
        image: storedBankData.image || DEFAULT_AVATAR,
        currentPage: "Loans",
    };
};

export const useBankStore = create((set, get) => ({
    ...getInitialState(),

    login: (email, name, phone, password) => {
        localStorage.setItem(AUTH_KEY, "true");
        const balance = get().balance || 6202.0;
        const image = get().image || DEFAULT_AVATAR;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ email, name, balance, phone, image, password })
        );

        set({ isLoggedIn: true, email, name, balance, phone, image, password });
    },

    logout: () => {
        localStorage.removeItem(AUTH_KEY);
        set({
            isLoggedIn: false,
            email: "",
            balance: 0,
            name: "",
            phone: "",
            password: "",
            image: "",
        });
    },

    setCurrentPage: (pageId) => set({ currentPage: pageId }),

    creditMoney: (amount) => {
        const numAmount = parseFloat(amount);
        if (!isNaN(numAmount) && numAmount > 0) {
            set((state) => {
                const newBalance = state.balance + numAmount;
                const { email, name, phone, password, image } = state;

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({ email, name, balance: newBalance, phone, password, image })
                );

                return { balance: newBalance };
            });
            return true;
        }
        return false;
    },

    cashOut: (amount) => {
        const numAmount = parseFloat(amount);
        if (!isNaN(numAmount) && numAmount > 0 && get().balance >= numAmount) {
            set((state) => {
                const newBalance = state.balance - numAmount;
                const { email, name, phone, password, image } = state;

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({ email, name, balance: newBalance, phone, password, image })
                );

                return { balance: newBalance };
            });
            return true;
        }
        return false;
    },

    // ✅ Update user info (name, phone, password, image)
    updateUserInfo: (newName, newPhone, newPassword, newImage) => {
        set((state) => {
            const updatedData = {
                ...state,
                name: newName || state.name,
                phone: newPhone || state.phone,
                password: newPassword || state.password,
                image: newImage || state.image || DEFAULT_AVATAR
            };

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    name: updatedData.name,
                    phone: updatedData.phone,
                    password: updatedData.password,
                    image: updatedData.image,
                    email: state.email,
                    balance: state.balance,
                })
            );

            return updatedData;
        });
    },
}));
