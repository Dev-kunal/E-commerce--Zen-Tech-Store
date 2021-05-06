import { useEffect } from "react";
import { CartPage, Login } from "./Components";
import { Navbar } from "./Components";
import { ProductPage } from "./Components";
import { WishlistPage } from "./Components";
import { ProductDetail } from "./Components";
import { HomePage } from "./Components";
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import { useAuth } from "./Context/UserProvider";
import { Signup } from "./Components/Authentication/Sigup";
import { User } from "./Components/User";
import { PrivateRoute } from "./Utils/PrivateRoute";
import { UseAxios } from "./Utils/UseAxios";
import { wishlistUrl, cartUrl } from "./Utils/ApiEndpoints";
import { useCart } from "./Context/CartProvider";

export default function App() {
  const { login, userDispatch } = useAuth();
  const { dispatch } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      userDispatch({
        type: "SET_LOGIN",
        payload: { user: user, login: true },
      });
    }
    console.log(login);
    if (login) {
      (async () => {
        try {
          const { wishlist } = await UseAxios(
            "GET",
            wishlistUrl + `/${user._id}`
          );
          dispatch({
            type: "SET_WISHLIST",
            payload: { wishlist: wishlist.map((item) => item.productId) },
          });
        } catch (err) {
          console.log(err);
        }
      })();
      (async () => {
        try {
          const { cart } = await UseAxios("GET", cartUrl + `/${user._id}`);
          dispatch({
            type: "SET_CART",
            payload: { cartItems: cart.map((item) => item.productId) },
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, []);

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
