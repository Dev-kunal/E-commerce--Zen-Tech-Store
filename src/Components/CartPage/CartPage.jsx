import { useCart } from "../../Context/CartProvider";
import { useRef, useState, useEffect } from "react";
import "./cart-page.css";
import { useNavigate } from "react-router-dom";
import { UseAxios } from "../../Utils/UseAxios";
import { cartUrl } from "../../Utils/ApiEndpoints";
import { useAuth } from "../../Context/UserProvider";
import Loader from "react-loader-spinner";
import { RenderCartItems } from "./RenderCartItmes";

export const CartPage = () => {
  const { itemsInCart, dispatch, showToast, toastMessage } = useCart();
  const [loading, setLoading] = useState(false);
  const { user, userDispatch } = useAuth();
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (itemsInCart.length < 1) {
          setLoading(true);
          console.log(user._id);
          const { cart } = await UseAxios("GET", cartUrl + `/${user._id}`);
          const cartItems = cart.map((product) => {
            return { ...product.productId, quantity: product.quantity };
          });
          console.log(cartItems);
          dispatch({
            type: "SET_CART",
            payload: { cartItems: cartItems },
          });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }
  const getTotalCartPrice = () => {
    return itemsInCart.reduce(
      (accu, item) => accu + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={1000}
          />
        </div>
      ) : (
        <>
          {itemsInCart.length < 1 ? (
            <div className="empty-msg">
              <div className="msg">Your tech Cart is empty</div>
              <br />
              <button
                onClick={() => navigate("/products")}
                className="btn btn-secondary no-shadow"
              >
                Let's Shop
              </button>
            </div>
          ) : (
            <div className="cart-page">
              <div className="cart-subtotal">
                Total Cart Price :<strong>₹{getTotalCartPrice()}</strong>
                <br />
              </div>
              <div className="cart-items-container">
                {RenderCartItems(itemsInCart, dispatch, setLoading)}
              </div>
              {showToast && (
                <div className="toast toast-n" ref={toast}>
                  <p>{toastMessage}</p>
                  <button className="btn toast-btn">X</button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
