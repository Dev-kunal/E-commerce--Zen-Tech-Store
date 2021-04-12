import { CartPage } from "./Components/CartPage/CartPage";
import { Navbar } from "./Components/Navbar/Navbar";
import { ProductPage } from "./Components/ProductPage/ProductPage";
import { WishlistPage } from "./Components/WishlistPage/WishlistPage";
import { ProductDetail } from "./Components/ProductDetail/ProductDetail";
import { HomePage } from "./Components/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import "./styles.css";

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
