import { CartPage } from "./Components/CartPage";
import { Navbar } from "./Components/Navbar";
import { ProductPage } from "./Components/ProductPage";
import { WishlistPage } from "./Components/WishlistPage";
import { ProductDetail } from "./Components/ProductDetail";
import { Routes, Route } from "react-router-dom";
import "../public/styles.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product-details/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}
