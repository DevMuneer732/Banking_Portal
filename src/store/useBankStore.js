import { create } from 'zustand';

const STORAGE_KEY = 'user_bank_account';
const AUTH_KEY = 'isLoggedIn';
const SIGNUP_KEY = 'signup-credentials';

// 🔹 Helper to safely get initial state from localStorage
const getInitialState = () => {
    const storedBankData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const storedAuth = localStorage.getItem(AUTH_KEY) === 'true';
    const storedCredentials = JSON.parse(localStorage.getItem(SIGNUP_KEY) || '{}');

    return {
        isLoggedIn: storedAuth,
        balance: storedBankData.balance ?? 6202.00, // Default design balance
        email: storedBankData.email || storedCredentials.email || '',
        name: storedBankData.name || storedCredentials.name || 'John',
        currentPage: 'Dashboard',
    };
};

export const useBankStore = create((set, get) => ({
    ...getInitialState(),

    // 🔹 Login and store user info
    login: (email, name) => {
        localStorage.setItem(AUTH_KEY, 'true');
        const current = get();
        const balance = current.balance || 6202.00;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ email, name, balance })
        );

        set({ isLoggedIn: true, email, name, balance });
    },

    // 🔹 Logout and clear session
    logout: () => {
        localStorage.removeItem(AUTH_KEY);
        set({
            isLoggedIn: false,
            email: '',
            balance: 0,
            name: '',
            currentPage: 'Dashboard',
        });
    },

    // 🔹 Navigate between pages
    setCurrentPage: (pageId) => set({ currentPage: pageId }),

    // 🔹 Add (credit) money
    creditMoney: (amount) => {
        const numAmount = parseFloat(amount);
        if (!isNaN(numAmount) && numAmount > 0) {
            set((state) => {
                const newBalance = state.balance + numAmount;
                const { email, name } = state;

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({ email, name, balance: newBalance })
                );

                return { balance: newBalance };
            });
            return true;
        }
        return false;
    },

    // 🔹 Withdraw (cash out) money
    cashOut: (amount) => {
        const numAmount = parseFloat(amount);
        if (!isNaN(numAmount) && numAmount > 0 && get().balance >= numAmount) {
            set((state) => {
                const newBalance = state.balance - numAmount;
                const { email, name } = state;

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({ email, name, balance: newBalance })
                );

                return { balance: newBalance };
            });
            return true;
        }
        return false;
    },
}));
