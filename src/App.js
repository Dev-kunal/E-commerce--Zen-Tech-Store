import { CartPage, Login } from "./Components";
import { Navbar } from "./Components";
import { ProductPage } from "./Components";
import { WishlistPage } from "./Components";
import { ProductDetail } from "./Components";
import { HomePage } from "./Components";
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import { useAuthContext } from "./Context/UserProvider";

export default function App() {
  const { login } = useAuthContext();
  function PrivateRoute({ login, ...props }) {
    return login ? <Route {...props} /> : <Navigate replace to="/login" />;
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        {/* <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} /> */}
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute
          path="/wishlist"
          login={login}
          element={<WishlistPage />}
        />
        <PrivateRoute path="/cart" login={login} element={<CartPage />} />
      </Routes>
    </div>
  );
}
