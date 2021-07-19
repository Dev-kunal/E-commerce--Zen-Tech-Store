import { createContext, useContext, useReducer, useEffect } from "react";
import {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "../../Utils/UseAxios";

const AuthContext = createContext();

const dataFromLocalStorage =
  JSON.parse(localStorage.getItem("session")) || null;
const token = dataFromLocalStorage ? dataFromLocalStorage.token : null;
const user = dataFromLocalStorage ? dataFromLocalStorage.user : null;

const initialState = {
  token,
  user,
};

export const AuthProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(userReducer, initialState);

  const logOutUser = () => {
    localStorage.removeItem("session");
    userDispatch({
      type: "SET_LOGIN",
      token: null,
      user: null,
    });
    setupAuthHeaderForServiceCalls(null);
  };
  useEffect(() => {
    if (token) {
      setupAuthExceptionHandler(logOutUser);
    }
  }, []);
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

    default:
      return state;
  }
};

export const useAuth = () => useContext(AuthContext);
