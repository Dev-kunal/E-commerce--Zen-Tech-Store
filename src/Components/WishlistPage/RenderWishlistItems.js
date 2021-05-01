export const RenderWishlistItems = (wishlist, dispatch) => {
  return wishlist.map(({ _id, name, price, images }) => (
    <div className="card product-card" key={_id}>
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
            type: "REMOVE_FROM_WISHLIST",
            payload: { itemId: _id },
          })
        }
      >
        Remove
      </button>
      <button
        className="btn card-btn"
        onClick={() => {
          dispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload: { itemId: _id },
          });
          dispatch({
            type: "ADD_TO_CART",
            payload: { newItem: { _id, name, price, images, quantity: 1 } },
          });
        }}
      >
        add To Cart
      </button>
    </div>
  ));
};
