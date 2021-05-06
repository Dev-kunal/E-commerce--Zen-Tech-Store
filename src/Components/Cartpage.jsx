export const Page = () => {
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
          <div className="card cart-item " key={id}>
            <img src={images[0]} width="70%" height="80%" alt="product" />
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
                className="btn"
              >
                <i className="fa fa-minus" aria-hidden="true"></i>
              </button>
              {quantity}

              <button
                className="btn"
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
                className="btn"
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
              <button className="btn card-btn">Checkout</button>
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
