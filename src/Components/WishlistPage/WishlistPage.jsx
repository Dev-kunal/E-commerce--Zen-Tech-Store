import { useRef } from "react";
import { useCart } from "../../CartContext";
import { useNavigate } from "react-router-dom";

export const WishlistPage = () => {
  const { wishlist, dispatch, showToast, toastMessage } = useCart();
  const toast = useRef(null);
  const navigate = useNavigate();

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "hideToast", payload: "HIDE_TOAST" });
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
      {wishlist.map(({ id, name, price, images }) => (
        <div className="card product-card" key={id}>
          <div className="card-img">
            <img src={images[0]} width="100%" height="auto" alt="img-logo" />
          </div>
          <div className="card-text">
            <p>
              <strong>{name}</strong>
              <span className="rating">
                4.8<i className="fa fa-star" aria-hidden="true"></i>
              </span>
              <br />
              <strong>₹ {price}</strong>
            </p>
          </div>
          <button
            className="btn card-btn btn-secondary"
            onClick={() =>
              dispatch({
                type: "removefromwishlist",
                payload: "REMOVE_FROM_WISHLIST",
                itemId: id,
              })
            }
          >
            Remove
          </button>
          <button
            className="btn card-btn"
            onClick={() => {
              dispatch({
                type: "removefromwishlist",
                payload: "REMOVE_FROM_WISHLIST",
                itemId: id,
              });
              dispatch({
                type: "addToCart",
                payload: "ADD_TO_CART",
                newItem: { id, name, price, images, quantity: 1 },
              });
            }}
          >
            add To Cart
          </button>
        </div>
      ))}
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </div>
  );
};
