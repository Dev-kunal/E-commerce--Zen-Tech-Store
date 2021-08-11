import { useCart } from "../../Context/CartProvider/index";
import { updateQuantity, removeFromCart } from "./services";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "react-loader-spinner";

export const CartItem = ({
  productId: {
    _id,
    price,
    oldPrice,
    name,
    images,
    fastDelivery,
    inStock,
    ratings,
  },
  quantity,
  setLoading,
}) => {
  const { dispatch } = useCart();
  const [btnLoader, setBtnLoader] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="cart-card" key={_id}>
        <div className="cart-img" onClick={() => navigate(`/products/${_id}`)}>
          <img src={images[0]} alt="Not-found" width="100%" height="auto" />
        </div>
        <div className="product-detail">
          <h3 style={{ marginTop: "0" }}>{name}</h3>
          <span className="rating">
            {ratings}
            <i className="fa fa-star" aria-hidden="true"></i>
          </span>
          <span>752 Ratings & 67 Reviews</span>
          <br />
          <h4
            style={{
              display: "inline-block",
              margin: "0.5em 0.4em 0.4em 0",
            }}
          >
            ₹ {price}
          </h4>
          <span className="old-price">₹ {oldPrice}</span>
          <br />
          Delivery : {fastDelivery ? "Same Day" : "3 Days Minimum"}
          <br />
          Stock : {inStock ? "In-Stock" : "Out Of Stock"}
          <div>
            <button
              disabled={quantity === 1 ? true : false}
              onClick={() =>
                updateQuantity({
                  type: "DEC",
                  id: _id,
                  dispatch,
                  setBtnLoader,
                })
              }
              className="btn btn-secondary no-shadow"
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>

            <div className="quantity">
              {btnLoader ? (
                <div className="btn-container">
                  <Loader
                    type="ThreeDots"
                    color="#2bc48a"
                    height={10}
                    width={15}
                    timeout={2000}
                  />
                </div>
              ) : (
                quantity
              )}
            </div>

            <button
              className="btn btn-secondary no-shadow"
              onClick={() =>
                updateQuantity({
                  type: "INC",
                  id: _id,
                  dispatch,
                  setBtnLoader,
                })
              }
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
            <button
              className="btn btn-secondary no-shadow"
              onClick={() => removeFromCart({ id: _id, dispatch, setLoading })}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
            <br />

            <div>Total Price ₹ {quantity > 1 ? quantity * price : price}</div>
          </div>
        </div>
      </div>
    </>
  );
};
