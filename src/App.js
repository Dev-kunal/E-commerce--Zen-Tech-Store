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

export default function App() {
  const { login, userDispatch } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) {
      userDispatch({
        type: "SET_LOGIN",
        payload: { login: true, user: user },
      });
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
