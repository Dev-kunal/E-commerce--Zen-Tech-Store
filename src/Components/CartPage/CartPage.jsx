import { useCart } from "../../Context/CartProvider";
import { useRef, useState, useEffect } from "react";
import "./cart-page.css";
import { useNavigate } from "react-router-dom";
import { UseAxios } from "../../Utils/UseAxios";
import Loader from "react-loader-spinner";
import { RenderCartItems } from "./RenderCartItems";
import StripeCheckout from "react-stripe-checkout";

export const CartPage = () => {
  const { itemsInCart, dispatch, showToast, toastMessage } = useCart();
  const [loading, setLoading] = useState(false);
  const [totalCartPrice, setTotalCart] = useState(0);
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { cart } = await UseAxios("GET", "/cart");
        dispatch({
          type: "SET_CART",
          payload: { cart },
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const makePayment = async (token) => {
    const body = {
      token,
      itemsInCart,
    };
    const { success, message } = await UseAxios("POST", "/payment", body);
    if (!success) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message },
      });
    }
    dispatch({
      type: "SHOW_TOAST",
      payload: { message: "Payment Recieved succesfully" },
    });
  };

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }
  useEffect(() => {
    setTotalCart(
      itemsInCart.reduce(
        (accu, item) => accu + item.productId.price * item.quantity,
        0
      )
    );
  }, [itemsInCart]);
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
          {itemsInCart?.length < 1 ? (
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
                Total Cart Price :<strong>₹{totalCartPrice}</strong>
                <br />
                <StripeCheckout
                  stripeKey={process.env.REACT_APP_KEY}
                  token={makePayment}
                  name="Zen Tech Store"
                  shippingAddress
                  billingAddress
                >
                  <button className="btn cart-btn">Checkout</button>
                </StripeCheckout>
              </div>
              <div className="cart-items-container">
                <RenderCartItems setLoading={setLoading} />
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
