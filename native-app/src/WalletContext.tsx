import React, { createContext, useContext, useState } from "react";
import { currentUser as initialUser, transactions as initialTransactions, Transaction } from "./data/mockData";

type WalletContextType = {
  balance: number;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id" | "date" | "status">) => void;
  deposit: (amount: number, method: string) => void;
  withdraw: (amount: number, bank: string) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState(initialUser.balance);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (newTx: Omit<Transaction, "id" | "date" | "status">) => {
    const tx: Transaction = {
      ...newTx,
      id: `t_${Date.now()}`,
      date: "Just now",
      status: "completed",
    };
    setTransactions((prev) => [tx, ...prev]);
    if (newTx.type === "sent") {
      setBalance((prev) => prev - newTx.amount);
    } else {
      setBalance((prev) => prev + newTx.amount);
    }
  };

  const deposit = async (amount: number, method: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/anchor/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anchor_domain: method,
          asset_code: "USDC",
          account: initialUser.stellarAddress
        })
      });
      if (!res.ok) throw new Error("Deposit failed");
      
      const tx: Transaction = {
        id: `t_${Date.now()}`,
        type: "received",
        name: method,
        username: `@${method.toLowerCase().replace(" ", "")}`,
        avatar: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=200&h=200",
        amount,
        note: `Deposited via ${method}`,
        date: "Just now",
        status: "completed",
      };
      setTransactions((prev) => [tx, ...prev]);
      setBalance((prev) => prev + amount);
    } catch (error) {
      console.error(error);
    }
  };

  const withdraw = async (amount: number, bank: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/anchor/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anchor_domain: bank,
          asset_code: "USDC",
          account: initialUser.stellarAddress
        })
      });
      if (!res.ok) throw new Error("Withdrawal failed");

      const tx: Transaction = {
        id: `t_${Date.now()}`,
        type: "sent",
        name: bank,
        username: `@${bank.toLowerCase().replace(" ", "")}`,
        avatar: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=200&h=200",
        amount,
        note: `Withdrew to ${bank}`,
        date: "Just now",
        status: "completed",
      };
      setTransactions((prev) => [tx, ...prev]);
      setBalance((prev) => prev - amount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, addTransaction, deposit, withdraw }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within a WalletProvider");
  return context;
};
