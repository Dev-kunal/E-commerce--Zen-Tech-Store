import { createContext, useContext } from "react";

const AuthContext = createContext();
const login = false;

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
