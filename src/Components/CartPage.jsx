import { useCart } from "../CartContext";
import { useRef } from "react";

export const CartPage = () => {
  const { itemsInCart, dispatch, showToast, toastMessage } = useCart();

  const toast = useRef(null);

  if (showToast) {
    setTimeout(() => {
      toast.current.style.display = "none";
      dispatch({ type: "hideToast", payload: "HIDE_TOAST" });
    }, 1000);
  }

  return (
    <div className="cart-page">
      <div className="cart-subtotal">
        {" "}
        Total Cart Price :
        <strong>
          {" "}
          &nbsp;₹
          {itemsInCart.reduce(
            (accu, item) => accu + item.price * item.quantity,
            0
          )}
        </strong>
        <br />
      </div>

      <div className="cart-items-container">
        <div></div>
        {itemsInCart.map(({ id, price, name, images, quantity }) => (
          <div className="card product-card" key={id}>
            <img src={images[0]} width="100%" height="auto" alt="product" />
            <div>
              {name}
              <br />
              <strong>₹ {price}</strong>
              <br />
              <button
                onClick={() => {
                  if (quantity > 1) {
                    dispatch({
                      type: "decreaseQuantity",
                      payload: "DECREASE_QUANTITY",
                      itemId: id,
                    });
                  } else {
                    dispatch({
                      type: "removeFromCart",
                      payload: "REMOVE_FROM_CART",
                      itemId: id,
                    });
                  }
                }}
                className="btn btn-secondary"
              >
                <i className="fa fa-minus" aria-hidden="true"></i>
              </button>
              {quantity}

              <button
                className="btn btn-secondary"
                onClick={() =>
                  dispatch({
                    type: "increaseQuantity",
                    payload: "INCREASE_QUANTITY",
                    itemId: id,
                  })
                }
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
              {/* <small>x {price}</small> */}

              <button
                className="btn btn-secondary"
                onClick={() =>
                  dispatch({
                    type: "removeFromCart",
                    payload: "REMOVE_FROM_CART",
                    itemId: id,
                  })
                }
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
              <button className="btn">Checkout</button>
              <div>Total Price ₹ {quantity > 1 ? quantity * price : price}</div>
            </div>
          </div>
        ))}
      </div>
      {showToast && (
        <div class="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button class="btn toast-btn">X</button>
        </div>
      )}
    </div>
  );
};
