import { useAuth } from "../../Context/UserProvider";
import { cartUrl, wishlistUrl } from "../../Utils/ApiEndpoints";
import { UseAxios } from "../../Utils/UseAxios";

export const RenderWishlistItems = ({ wishlist, dispatch, setloading }) => {
  const { user } = useAuth();
  const handleRemoveItem = (id) => {
    (async () => {
      try {
        const obj = {
          userId: user._id,
          productId: id,
        };
        setloading(true);
        const { deletedItem } = await UseAxios(
          "POST",
          wishlistUrl + `/delete`,
          obj
        );
        console.log(deletedItem);
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
    (async () => {
      try {
        const obj = {
          userId: user._id,
          productId: id,
          quantity: 1,
        };
        setloading(true);
        const { savedCartItem } = await UseAxios(
          "POST",
          wishlistUrl + `/addtocart`,
          obj
        );
        console.log(savedCartItem);
        const { deletedItem } = await UseAxios(
          "POST",
          wishlistUrl + `/delete`,
          obj
        );
        console.log(deletedItem);
        dispatch({
          type: "ADD_TO_CART",
          payload: { newItem: savedCartItem },
        });
        dispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: { itemId: deletedItem.productId },
        });

        setloading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  };

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
