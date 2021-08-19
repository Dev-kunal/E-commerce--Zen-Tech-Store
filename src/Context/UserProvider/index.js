import { createContext, useContext, useReducer, useEffect } from "react";

import { setupAuthHeaderForServiceCalls } from "../../Utils/UseAxios";

const AuthContext = createContext();

const dataFromLocalStorage =
  JSON.parse(localStorage.getItem("session")) || null;
const token = dataFromLocalStorage ? dataFromLocalStorage.token : null;
const user = dataFromLocalStorage ? dataFromLocalStorage.user : null;

if (token) {
  setupAuthHeaderForServiceCalls(token);
}
const initialState = {
  token,
  user,
};

export const AuthProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(userReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, userDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGIN":
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };

    case "LOGOUT":
      return {
        ...state,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};

export const useAuth = () => useContext(AuthContext);
