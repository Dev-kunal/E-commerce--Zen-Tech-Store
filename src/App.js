import { CartPage } from "./Components";
import { Navbar } from "./Components";
import { ProductPage } from "./Components";
import { WishlistPage } from "./Components";
import { ProductDetail } from "./Components";
import { HomePage } from "./Components";
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
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}
