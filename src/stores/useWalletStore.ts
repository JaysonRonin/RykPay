import { randStr } from '@/utils/randStr';
import { create } from 'zustand';

export type Transaction = {
  id: string;
  type: 'deposit' | 'transfer';
  amount: number;
  recipient?: string;
  createdAt: string;
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
          id: randStr(''),
          type: 'deposit',
          amount,
          createdAt: new Date().toISOString(),
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
              id: randStr(''),
              type: 'transfer',
              amount,
              recipient,
              createdAt: new Date().toISOString(),
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
