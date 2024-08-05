import React, { createContext, useState } from 'react';
import pb from '../lib/pocketbase';
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



// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(pb.authStore.isAdmin);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};