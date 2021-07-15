import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../Context/CartProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/UserProvider";

import { UseAxios } from "../../Utils/UseAxios";
import Loader from "react-loader-spinner";
import "./product-detail.css";

export const ProductDetail = () => {
  const [loading, setLoading] = useState(true);
  const [product, setproduct] = useState(null);
  const { dispatch, showToast, toastMessage, wishlist, itemsInCart } =
    useCart();
  const { token } = useAuth();
  const { productId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await UseAxios("GET", `/products/${productId}`);
        setproduct(response.product);
        setLoading(false);
        console.log(product);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const toast = useRef(null);
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }
  const addToWishlist = (id) => {
    if (token) {
      (async () => {
        try {
          const obj = {
            productId: id,
          };
          setLoading(true);
          const { newItemInWishlist } = await UseAxios(
            "POST",
            "/wishlist",
            obj
          );
          console.log("saved item in wishlist", newItemInWishlist);
          dispatch({
            type: "ADD_TO_WISHLIST",
            payload: { newItemInWishlist },
          });
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      navigate("/login");
    }
  };
  const handleAddToCart = (id) => {
    if (token) {
      (async () => {
        try {
          const obj = {
            productId: id,
          };
          setLoading(true);
          if (
            itemsInCart.filter((product) => product.productId._id === id).length
          ) {
            setLoading(false);
            dispatch({
              type: "SHOW_TOAST",
              payload: { message: "Product is already present Cart" },
            });
          } else {
            const { newCartItem } = await UseAxios("POST", "/cart", obj);
            dispatch({
              type: "ADD_TO_CART",
              payload: { newCartItem },
            });
          }

          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      navigate("/login");
    }
  };
  const removeFromWishlist = (id) => {
    if (token) {
      (async () => {
        try {
          const obj = {
            productId: id,
          };
          setLoading(true);
          const { deletedItem } = await UseAxios(
            "POST",
            `wishlist/remove`,
            obj
          );
          // console.log(deletedItem);
          setLoading(false);
          dispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload: { itemId: deletedItem.productId },
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };
  return (
    <>
      {loading && (
        <div className="loader-container">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={2000}
          />
        </div>
      )}
      :
      {product && (
        <>
          <div className="product-detail-page">
            <button
              onClick={() => navigate("/products")}
              className="btn btn-secondary back-btn"
            >
              Back
            </button>
            <div className="details-card">
              <div className="detail-img">
                <img
                  src={product.images[0]}
                  alt="Not-found"
                  width="100%"
                  height="auto"
                />
              </div>
              <div className="product-detail">
                {wishlist?.some(
                  (item) => item?.productId._id === product._id
                ) ? (
                  <button
                    className="wishlist-badge wishlist-btn"
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    <i className="fa fa-heart"></i>
                  </button>
                ) : (
                  <button
                    className="wishlist-badge wishlist-btn"
                    onClick={() => addToWishlist(product._id)}
                  >
                    <i className="fa fa-heart-o"></i>
                  </button>
                )}
                <h2 style={{ marginTop: "0" }}>{product.name}</h2>
                <span className="rating">
                  {product.ratings}
                  <i className="fa fa-star" aria-hidden="true"></i>
                </span>
                <span>752 Ratings & 67 Reviews</span>
                <br />
                <h3
                  style={{
                    display: "inline-block",
                    margin: "0.5em 0.4em 0.4em 0",
                  }}
                >
                  ₹ {product.price}
                </h3>
                <span className="old-price">₹ {product.oldPrice}</span>
                <br />
                Delivery :{" "}
                {product.fastDelivery ? "Same Day" : "3 Days Minimum"}
                <br />
                Stock : {product.inStock ? "In-Stock" : "Out Of Stock"}
                <ul style={{ paddingLeft: "0.9em" }}>
                  {product.features.map((feature) => (
                    <li>{feature}</li>
                  ))}
                </ul>
                <div>
                  <button
                    onClick={() => handleAddToCart(product._id)}
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
        </>
      )}
    </>
  );
};
