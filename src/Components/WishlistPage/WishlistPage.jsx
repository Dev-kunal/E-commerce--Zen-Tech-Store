import { useRef } from "react";
import { useCart } from "../../Context/CartProvider";
import { useNavigate } from "react-router-dom";
import { RenderWishlistItems } from "./RenderWishlistItems";

export const WishlistPage = () => {
  const { wishlist, dispatch, showToast, toastMessage } = useCart();
  const toast = useRef(null);
  const navigate = useNavigate();

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }

  return (
    <div className="wishlist-page">
      {wishlist.length < 1 && (
        <div className="empty-msg">
          <div className="msg">Your tech wishlist is empty</div>
          <br />
          <button
            onClick={() => navigate("/products")}
            className="btn btn-secondary no-shadow"
          >
            Shop best deals
          </button>
        </div>
      )}
      {RenderWishlistItems(wishlist, dispatch)}
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </div>
  );
};
