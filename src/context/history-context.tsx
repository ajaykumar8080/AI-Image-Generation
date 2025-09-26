
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HistoryContextType {
  history: string[];
  addHistory: (prompt: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<string[]>([]);

  const addHistory = (prompt: string) => {
    setHistory(prevHistory =>
      [prompt, ...prevHistory.filter(p => p.toLowerCase() !== prompt.toLowerCase())].slice(0, 15)
    );
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
