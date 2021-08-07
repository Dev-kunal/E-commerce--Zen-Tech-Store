import { useCart } from "../../Context/CartProvider";
import { UseAxios } from "../../Utils/UseAxios";

export const RenderWishlistItems = ({ setloading }) => {
  const { wishlist, dispatch, itemsInCart } = useCart();

  const handleRemoveItem = (id) => {
    (async () => {
      try {
        const obj = {
          productId: id,
        };
        setloading(true);
        const { deletedItem } = await UseAxios("POST", `wishlist/remove`, obj);
        setloading(false);
        dispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: { itemId: deletedItem.productId },
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleAddToCart = (id) => {
    if (itemsInCart.filter((product) => product.productId._id === id).length) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Product is already present Cart" },
      });
    } else {
      (async () => {
        try {
          const obj = {
            productId: id,
          };
          setloading(true);
          const { success, newCartItem, message } = await UseAxios(
            "POST",
            `wishlist/addtocart`,
            obj
          );
          if (success) {
            dispatch({
              type: "ADD_TO_CART_FROM_WISHLIST",
              payload: { newCartItem },
            });
          } else {
            dispatch({
              type: "SHOW_TOAST",
              payload: { message: message },
            });
          }

          setloading(false);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  return wishlist?.map(({ productId: { _id, name, price, images } }) => (
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
        onClick={() => handleRemoveItem(_id)}
      >
        Remove
      </button>
      <button className="btn card-btn" onClick={() => handleAddToCart(_id)}>
        add To Cart
      </button>
    </div>
  ));
};
