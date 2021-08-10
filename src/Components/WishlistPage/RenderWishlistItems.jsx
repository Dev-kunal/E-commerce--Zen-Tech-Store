import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartProvider";
import { removeItemFromWishlist, addToCart } from "./services";

export const RenderWishlistItems = ({ setloading }) => {
  const { wishlist, dispatch, itemsInCart } = useCart();
  const navigate = useNavigate();

  return wishlist?.map(({ productId: { _id, name, price, images } }) => (
    <div className="card product-card" key={_id}>
      <div className="card-img" onClick={() => navigate(`/products/${_id}`)}>
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
          removeItemFromWishlist({ id: _id, dispatch, setloading })
        }
      >
        Remove
      </button>
      <button
        className="btn card-btn"
        onClick={() =>
          addToCart({ id: _id, itemsInCart, dispatch, setloading })
        }
      >
        add To Cart
      </button>
    </div>
  ));
};
