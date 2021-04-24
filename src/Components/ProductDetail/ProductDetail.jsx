import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../Context/CartProvider";
import { useNavigate } from "react-router-dom";
import "./product-detail.css";

export const ProductDetail = () => {
  const {
    productData,
    dispatch,
    showToast,
    toastMessage,
    wishlist,
  } = useCart();
  const { productId } = useParams();
  const navigate = useNavigate();

  const toast = useRef(null);
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST", payload: "HIDE_TOAST" });
    }, 1000);
  }

  const {
    id,
    name,
    images,
    price,
    oldPrice,
    fastDelivery,
    ratings,
    features,
    inStock,
  } = productData.find((product) => product.id === productId);

  return (
    <div className="product-detail-page">
      <button
        onClick={() => navigate("/products")}
        className="btn btn-secondary back-btn"
      >
        Back
      </button>
      <div className="details-card">
        <div className="detail-img">
          <img src={images[0]} alt="Not-found" width="100%" height="auto" />
        </div>
        <div className="product-detail">
          {wishlist.find((item) => item.id === id) ? (
            <button
              className="wishlist-badge wishlist-btn"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_WISHLIST",
                  payload: { itemId: id },
                })
              }
            >
              <i className="fa fa-heart"></i>
            </button>
          ) : (
            <button
              className="wishlist-badge wishlist-btn"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_WISHLIST",
                  payload: {
                    item: {
                      id,
                      name,
                      images,
                      price,
                      oldPrice,
                      fastDelivery,
                      ratings,
                      features,
                      inStock,
                    },
                  },
                })
              }
            >
              <i className="fa fa-heart-o"></i>
            </button>
          )}
          <h2 style={{ marginTop: "0" }}>{name}</h2>
          <span className="rating">
            {ratings}
            <i className="fa fa-star" aria-hidden="true"></i>
          </span>
          <span>752 Ratings & 67 Reviews</span>
          <br />
          <h3
            style={{ display: "inline-block", margin: "0.5em 0.4em 0.4em 0" }}
          >
            ₹ {price}
          </h3>
          <span className="old-price">₹ {oldPrice}</span>
          <br />
          Delivery : {fastDelivery ? "Same Day" : "3 Days Minimum"}
          <br />
          Stock : {inStock ? "In-Stock" : "Out Of Stock"}
          <ul style={{ paddingLeft: "0.9em" }}>
            {features.map((feature) => (
              <li>{feature}</li>
            ))}
          </ul>
          <div>
            <button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    newItem: {
                      id,
                      name,
                      images,
                      price,
                      fastDelivery,
                      ratings,
                      features,
                      inStock,
                      quantity: 1,
                    },
                  },
                })
              }
              className="btn btn-lg"
            >
              ADD TO CART
            </button>
            <button className="btn btn-lg card-btn">BUY NOW</button>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </div>
  );
};
