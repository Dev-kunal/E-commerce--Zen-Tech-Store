import { useAuth } from "../Context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartProvider";

export const User = () => {
  const { userDispatch } = useAuth();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    userDispatch({
      type: "SET_LOGIN",
      payload: { token: null, user: null },
    });
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("session");
    navigate("/products");
  };
  return (
    <div className="user-page">
      <h2>This is Users page</h2>
      <button onClick={handleLogoutClick} className="btn">
        Log-out
      </button>
    </div>
  );
};
