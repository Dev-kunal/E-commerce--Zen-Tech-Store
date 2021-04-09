import { CartPage } from "./Components/CartPage";
import { Navbar } from "./Components/Navbar";
import { ProductPage } from "./Components/ProductPage";
import { WishlistPage } from "./Components/WishlistPage";
import { ProductDetail } from "./Components/ProductDetail";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import { HomePage } from "./Components/HomePage";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product-details/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}
