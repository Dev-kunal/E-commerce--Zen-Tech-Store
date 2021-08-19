import { useCart } from "../../Context/CartProvider";
import { useRef, useState, useEffect } from "react";
import "./cart-page.css";
import { useNavigate } from "react-router-dom";
import { UseAxios } from "../../Utils/UseAxios";
import Loader from "react-loader-spinner";
import StripeCheckout from "react-stripe-checkout";
import { loadCart } from "./services";
import { CartItem } from "./CartItem";

export const CartPage = () => {
  const { itemsInCart, dispatch, showToast, toastMessage, loadCartChanges } =
    useCart();
  const [loading, setLoading] = useState(false);
  const [totalCartPrice, setTotalCart] = useState(0);
  const toast = useRef(null);
  const navigate = useNavigate();

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 2000);
  }

  useEffect(() => {
    if (loadCartChanges) {
      loadCart({ dispatch, setLoading });
    }
  }, [loadCartChanges]);

  const makePayment = async (token) => {
    const body = {
      token,
      itemsInCart,
    };
    const { success, message } = await UseAxios("POST", "/payment", body);
    if (success) {
      dispatch({
        type: "ORDER_PLACED",
        payload: { message },
      });
    } else {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message },
      });
    }
  };

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
                Total Cart Price :<strong>₹ {totalCartPrice}</strong>
                <br />
                <StripeCheckout
                  stripeKey={process.env.REACT_APP_KEY}
                  token={() => makePayment()}
                  name="Zen Tech Store"
                  amount={totalCartPrice * 100}
                  currency="INR"
                  shippingAddress
                  billingAddress
                ></StripeCheckout>
              </div>
              <div className="cart-items-container">
                {itemsInCart?.map((item) => (
                  <CartItem
                    {...item}
                    setLoading={setLoading}
                    key={item.productId._id}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
