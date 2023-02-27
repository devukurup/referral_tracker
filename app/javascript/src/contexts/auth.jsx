import React from "react";

import { either, isEmpty, isNil } from "ramda";

import { getFromLocalStorage } from "helpers/storage";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  const initialValues = {
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={initialValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
