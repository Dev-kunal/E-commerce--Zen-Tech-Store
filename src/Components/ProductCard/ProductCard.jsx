import { useCart } from "../../Context/CartProvider";
import { useNavigate } from "react-router-dom";
import "./product-card.css";

export const ProductCard = ({ product }) => {
  const { wishlist, dispatch } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="card product-card">
      {wishlist.find((item) => item.id === product.id) ? (
        <button
          className="wishlist-badge wishlist-btn"
          onClick={() =>
            dispatch({
              type: "REMOVE_FROM_WISHLIST",
              payload: { itemId: product.id },
            })
          }
        >
          <i className="fa fa-heart"></i>
        </button>
      ) : (
        <button
          className="wishlist-badge wishlist-btn"
          onClick={() =>
            dispatch({
              type: "ADD_TO_WISHLIST",
              payload: { item: product },
            })
          }
        >
          <i className="fa fa-heart-o"></i>
        </button>
      )}

      <div className="card-img">
        <img
          src={product.images[0]}
          width="100%"
          height="auto"
          alt="img-logo"
        />
      </div>
      <div className="card-text">
        <p>
          <strong>{product.name}</strong>
          <span className="rating">
            {product.ratings}
            <i className="fa fa-star" aria-hidden="true"></i>
          </span>
          <br />
          <strong>₹{product.price}</strong>
          <span className="old-price">₹ {product.oldPrice}</span>
          <br />
          Delivery : {product.fastDelivery ? "Same Day" : "3 Days Minimum"}
          <br />
          Stock : {product.inStock ? "In-Stock" : "Out Of Stock"}
        </p>
      </div>
      <button
        className="btn "
        onClick={() =>
          dispatch({
            type: "ADD_TO_CART",
            payload: { newItem: { ...product, quantity: 1 } },
          })
        }
      >
        add to Cart
      </button>
      <button
        onClick={() => handleProductClick(product.id)}
        className="btn btn-secondary"
      >
        See Details
      </button>
    </div>
  );
};
