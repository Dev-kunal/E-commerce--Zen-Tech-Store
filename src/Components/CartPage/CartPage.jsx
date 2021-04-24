import { useCart } from "../../Context/CartProvider";
import { useRef } from "react";
import "./cart-page.css";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const { itemsInCart, dispatch, showToast, toastMessage } = useCart();
  const toast = useRef(null);
  const navigate = useNavigate();

  const cartlength = itemsInCart.reduce((accu, item) => {
    return item.quantity + accu;
  }, 0);

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

  const updateQuantity = (type, id, quantity) => {
    if (type === "INC") {
      dispatch({
        type: "INCREASE_QUANTITY",
        payload: { itemId: id },
      });
    } else {
      if (quantity > 1) {
        dispatch({
          type: "DECREASE_QUANTITY",
          payload: { itemId: id },
        });
      } else {
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: { itemId: id },
        });
      }
    }
  };
  return (
    <div className="cart-page">
      <div className="cart-subtotal">
        Total Cart Price :<strong>₹{getTotalCartPrice()}</strong>
        <br />
      </div>

      <div className="cart-items-container">
        {cartlength < 1 && (
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
        )}
        {itemsInCart.map(
          ({
            id,
            price,
            oldPrice,
            name,
            images,
            quantity,
            fastDelivery,
            inStock,
            ratings,
          }) => (
            <div className="card" key={id}>
              <img src={images[0]} width="100%" height="auto" alt="product" />
              <div>
                <p>
                  <strong>{name}</strong>
                  <span className="rating">
                    {ratings}
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </span>
                  <br />
                  <strong>₹{price}</strong>
                  <span className="old-price">₹ {oldPrice}</span>
                  <br />
                  Delivery : {fastDelivery ? "Same Day" : "3 Days Minimum"}
                  <br />
                  Stock : {inStock ? "In-Stock" : "Out Of Stock"}
                </p>
                <button
                  onClick={() => updateQuantity("DEC", id, quantity)}
                  className="btn btn-secondary no-shadow"
                >
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </button>

                <span className="quantity">{quantity}</span>

                <button
                  className="btn btn-secondary no-shadow"
                  onClick={() => updateQuantity("INC", id, quantity)}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
                <button
                  className="btn btn-secondary no-shadow"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: { itemId: id },
                    })
                  }
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button className="btn">Checkout</button>
                <div>
                  Total Price ₹ {quantity > 1 ? quantity * price : price}
                </div>
              </div>
            </div>
          )
        )}
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
