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
  const [wishlistLoader, setWishlistLoader] = useState(false);
  const [cartLoader, setCartLoader] = useState(false);
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
          setWishlistLoader(true);
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
          setWishlistLoader(false);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      navigate("/login");
    }
  };
  const addToCart = (id) => {
    if (token) {
      (async () => {
        try {
          const obj = {
            productId: id,
          };
          setCartLoader(true);
          if (
            itemsInCart.filter((product) => product.productId._id === id).length
          ) {
            setCartLoader(false);
            dispatch({
              type: "SHOW_TOAST",
              payload: { message: "Product is already present Cart" },
            });
          } else {
            const { newCartItem } = await UseAxios("POST", "/cart", obj);
            setCartLoader(false);
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
          setWishlistLoader(true);
          const { deletedItem } = await UseAxios(
            "POST",
            `wishlist/remove`,
            obj
          );
          setWishlistLoader(false);
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

      {product && (
        <>
          <div className="product-detail-page">
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
                    {wishlistLoader ? (
                      <div className="btn-container">
                        <Loader
                          type="ThreeDots"
                          color="#2bc48a"
                          height={10}
                          width={20}
                          timeout={2000}
                        />
                      </div>
                    ) : (
                      <i className="fa fa-heart"></i>
                    )}
                  </button>
                ) : (
                  <button
                    className="wishlist-badge wishlist-btn"
                    onClick={() => addToWishlist(product._id)}
                  >
                    {wishlistLoader ? (
                      <div className="btn-container">
                        <Loader
                          type="ThreeDots"
                          color="#2bc48a"
                          height={10}
                          width={20}
                          timeout={1000}
                        />
                      </div>
                    ) : (
                      <i className="fa fa-heart-o"></i>
                    )}
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
                    onClick={() => addToCart(product._id)}
                    className="btn btn-lg"
                  >
                    {cartLoader ? (
                      <div className="btn-container">
                        <Loader
                          type="ThreeDots"
                          color="#ffffff"
                          height={10}
                          width={50}
                          timeout={1000}
                        />
                      </div>
                    ) : (
                      "ADD TO CART"
                    )}
                  </button>
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
