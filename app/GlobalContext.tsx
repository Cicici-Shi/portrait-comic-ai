import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GlobalContextProps {
  openaiKey: string;
  setOpenaiKey: (key: string) => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  return (
    <GlobalContext.Provider value={{ openaiKey, setOpenaiKey, imageUrl, setImageUrl }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};