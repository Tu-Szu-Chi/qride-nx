import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PhoneContextType {
  phone: string | null;
  setPhone: (phone: string | null) => void;
}

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const PhoneProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [phone, setPhone] = useState<string | null>(null);

  return (
    <PhoneContext.Provider value={{ phone, setPhone }}>
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (context === undefined) {
    throw new Error('usePhone must be used within a PhoneProvider');
  }
  return context;
};