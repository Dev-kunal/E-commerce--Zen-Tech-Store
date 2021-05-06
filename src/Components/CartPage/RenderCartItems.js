import { useAuth } from "../../Context/UserProvider";
import { cartUrl } from "../../Utils/ApiEndpoints";
import { UseAxios } from "../../Utils/UseAxios";

export const RenderCartItems = (itemsInCart, dispatch, setLoading) => {
  const { user } = useAuth();

  const updateQuantity = (type, id, quantity) => {
    (async () => {
      try {
        const obj = {
          userId: user._id,
          productId: id,
          updateType: type,
        };
        setLoading(true);
        const { productToUpdate } = await UseAxios(
          "POST",
          cartUrl + `/update`,
          obj
        );
        if (type === "INC") {
          dispatch({
            type: "INCREASE_QUANTITY",
            payload: { itemId: productToUpdate.productId },
          });
        } else {
          if (quantity > 1) {
            dispatch({
              type: "DECREASE_QUANTITY",
              payload: { itemId: productToUpdate.productId },
            });
          } else {
            const { deletedItem } = await UseAxios(
              "POST",
              cartUrl + `/delete`,
              obj
            );
            console.log(deletedItem);
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: { itemId: deletedItem.productId },
            });
          }
        }
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
          userId: user._id,
          productId: id,
        };
        setLoading(true);
        const { deletedItem } = await UseAxios(
          "POST",
          cartUrl + `/delete`,
          obj
        );
        console.log(deletedItem);
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: { itemId: deletedItem.productId },
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return itemsInCart.map(
    ({
      _id,
      price,
      oldPrice,
      name,
      images,
      quantity,
      fastDelivery,
      inStock,
      ratings,
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
