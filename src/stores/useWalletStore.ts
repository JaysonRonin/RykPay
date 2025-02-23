import { create } from 'zustand';

export type Transaction = {
  id: string;
  type: 'deposit' | 'transfer';
  amount: number;
  recipient?: string;
  timestamp: string;
};

export type WalletState = {
  balance: number;
  transactions: Transaction[];
  deposit: (amount: number) => void;
  transfer: (amount: number, recipient: string) => void;
  resetWallet: () => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  balance: 1000,
  transactions: [],

  deposit: (amount) =>
    set((state) => ({
      balance: state.balance + amount,
      transactions: [
        ...state.transactions,
        {
          id: crypto.randomUUID(),
          type: 'deposit',
          amount,
          timestamp: new Date().toISOString(),
        },
      ],
    })),

  transfer: (amount, recipient) =>
    set((state) => {
      if (state.balance >= amount) {
        return {
          balance: state.balance - amount,
          transactions: [
            ...state.transactions,
            {
              id: crypto.randomUUID(),
              type: 'transfer',
              amount,
              recipient,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return state;
    }),

  resetWallet: () =>
    set({
      balance: 1000,
      transactions: [],
    }),
}));
