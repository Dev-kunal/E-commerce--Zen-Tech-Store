import { useEffect } from "react";
import { CartPage, Login } from "./Components";
import { Navbar } from "./Components";
import { ProductPage } from "./Components";
import { WishlistPage } from "./Components";
import { ProductDetail } from "./Components";
import { HomePage } from "./Components";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./styles.css";
import { useAuth } from "./Context/UserProvider";
import { Signup } from "./Components/Authentication/Sigup";
import { User } from "./Components/User";
import { PrivateRoute } from "./Utils/PrivateRoute";
import { setupAuthExceptionHandler, UseAxios } from "./Utils/UseAxios";
import { useCart } from "./Context/CartProvider";
import { setupAuthHeaderForServiceCalls } from "./Utils/UseAxios";

export default function App() {
  const { token, userDispatch } = useAuth();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.removeItem("session");
    userDispatch({
      type: "LOGOUT",
    });
  };
  useEffect(() => {
    if (token) {
      setupAuthHeaderForServiceCalls(token);
      setupAuthExceptionHandler(logOutUser, navigate);
    }
  }, []);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { wishlist } = await UseAxios("GET", "/wishlist");
          dispatch({
            type: "SET_WISHLIST",
            payload: { wishlist },
          });
        } catch (err) {
          console.log(err);
        }
      })();
      (async () => {
        try {
          const { cart } = await UseAxios("GET", "/cart");
          dispatch({
            type: "SET_CART",
            payload: { cart },
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [token]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/wishlist" element={<WishlistPage />} />
        <PrivateRoute path="/user" element={<User />} />
        <PrivateRoute path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}
