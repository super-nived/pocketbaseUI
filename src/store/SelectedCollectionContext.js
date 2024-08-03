import React, { createContext, useState } from 'react';
// Create a Context
export const SelectedCollectionContext = createContext();

// Create a Provider component
export const SelectedCollectionProvider = ({ children }) => {
  const [selectedCollection, setSelectedCollection] = useState(null);

  return (
    <SelectedCollectionContext.Provider value={{ selectedCollection, setSelectedCollection }}>
      {children}
    </SelectedCollectionContext.Provider>
  );
};
