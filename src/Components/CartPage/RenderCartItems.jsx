import { cartUrl } from "../../Utils/ApiEndpoints";
import { UseAxios } from "../../Utils/UseAxios";
import { useCart } from "../../Context/CartProvider/index";
import { useAuth } from "../../Context/UserProvider/index";

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
        console.log(removedCartItem);
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
      <div className="card" key={_id}>
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
          <button className="btn">Checkout</button>
          <div>Total Price ₹ {quantity > 1 ? quantity * price : price}</div>
        </div>
      </div>
    )
  );
};
