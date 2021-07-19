import { UseAxios } from "../../Utils/UseAxios";
import { useCart } from "../../Context/CartProvider/index";

export const RenderCartItems = ({ setLoading }) => {
  const { itemsInCart, dispatch } = useCart();

  const updateQuantity = (type, id) => {
    (async () => {
      try {
        const obj = {
          productId: id,
          updateType: type,
        };
        setLoading(true);
        const { updatedProduct } = await UseAxios("POST", `cart/update`, obj);
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { updatedProduct },
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleRemoveFromCart = (id) => {
    (async () => {
      try {
        const obj = {
          productId: id,
        };
        setLoading(true);
        const { removedCartItem } = await UseAxios("POST", `cart/remove`, obj);
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: { itemId: removedCartItem.productId },
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return itemsInCart?.map(
    ({
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
    }) => (
      <>
        <div className="cart-card">
          <div className="cart-img">
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
                onClick={() => updateQuantity("DEC", _id, quantity)}
                className="btn btn-secondary no-shadow"
              >
                <i className="fa fa-minus" aria-hidden="true"></i>
              </button>

              <span className="quantity">{quantity}</span>

              <button
                className="btn btn-secondary no-shadow"
                onClick={() => updateQuantity("INC", _id, quantity)}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
              <button
                className="btn btn-secondary no-shadow"
                onClick={() => handleRemoveFromCart(_id)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
              <br />
              {/* <button className="btn cart-btn">Checkout</button> */}
              <div>Total Price ₹ {quantity > 1 ? quantity * price : price}</div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
