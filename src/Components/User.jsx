import { useAuth } from "../Context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartProvider";

export const User = () => {
  const { userDispatch, user } = useAuth();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const logOutUser = () => {
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
      <div className="user-container">
        <div className="user-div">
          <img
            class="avatar-small"
            src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png"
            alt="Avatar"
          />
          <span>
            Hello <span style={{ fontSize: "x-large" }}>{user.username}</span>
          </span>
          <button
            class="btn btn-secondary user-action-btn"
            onClick={() => navigate("/cart")}
          >
            See your cart
          </button>
          <button
            class="btn btn-secondary user-action-btn"
            onClick={() => navigate("/wishlist")}
          >
            See your wishlist
          </button>
          <button onClick={logOutUser} className="btn user-action-btn">
            Log-out
          </button>
        </div>
      </div>
    </div>
  );
};
