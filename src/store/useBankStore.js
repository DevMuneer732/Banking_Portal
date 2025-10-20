import { create } from 'zustand';

// --- Local Storage Key ---
const STORAGE_KEY = 'user_bank_account';

// --- Helper function to initialize state from Local Storage ---
const getInitialState = () => {
    const storedBankData = localStorage.getItem(STORAGE_KEY);
    const storedAuth = localStorage.getItem('isLoggedIn');

    // Retrieve initial data or set defaults
    let initialBalance = 0;
    let initialEmail = '';
    let initialName = '';

    if (storedBankData) {
        const data = JSON.parse(storedBankData);
        initialBalance = data.balance;
        initialEmail = data.email;
        initialName= data.name;
    } else {
        // If bank data is missing, check for basic signup credentials
        const storedCredentials = JSON.parse(localStorage.getItem('signup-credentials') || '{}');
        initialBalance = 6202.00; // Initialize with design value
        initialEmail = storedCredentials.email || '';
        initialName= storedCredentials.name || 'John'
    }

    return {
        isLoggedIn: storedAuth === 'true',
        balance: initialBalance,
        email: initialEmail,
        name: initialName, // Default name
    };
};

export const useBankStore = create((set, get) => ({
    // Initial State
    ...getInitialState(),

    // --- Authentication Actions ---
    login: (email, name ) => {
        // Update local storage and state for successful login
        localStorage.setItem('isLoggedIn', 'true');
        set({
            isLoggedIn: true,
            email,
            name,
        });

        // Ensure user's balance data exists in local storage after login
        const currentBankData = localStorage.getItem(STORAGE_KEY);
        if (!currentBankData) {
            const { balance } = get();
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, balance, name }));
        }
    },

    logout: () => {
        // Clear auth status and sensitive local storage items
        localStorage.removeItem('isLoggedIn');
        // Note: We keep 'signup-credentials' and 'user_bank_account' for persistence demo
        set({
            isLoggedIn: false,
            email: '',
            balance: 0
        });
    },

    // --- Account Management Actions (CRUD) ---
    creditMoney: (amount) => {
        const numAmount = parseFloat(amount);
        if (numAmount > 0) {
            set((state) => {
                const newBalance = state.balance + numAmount;
                // Update local storage
                const { email, name } = state;
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, balance: newBalance, name }));
                return { balance: newBalance };
            });
            return true;
        }
        return false;
    },

    cashOut: (amount) => {
        const numAmount = parseFloat(amount);
        if (numAmount > 0 && get().balance >= numAmount) {
            set((state) => {
                const newBalance = state.balance - numAmount;
                // Update local storage
                const { email, name } = state;
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, balance: newBalance, name }));
                return { balance: newBalance };
            });
            return true;
        }
        return false;
    },
}));