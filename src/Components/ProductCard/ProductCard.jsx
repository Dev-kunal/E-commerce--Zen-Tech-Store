import { useCart } from "../../Context/CartProvider";
import { useNavigate } from "react-router-dom";
import "./product-card.css";
import { useAuth } from "../../Context/UserProvider";
import Loader from "react-loader-spinner";
import { useState } from "react";
import { UseAxios } from "../../Utils/UseAxios";
import { cartUrl, wishlistUrl } from "../../Utils/ApiEndpoints";

export const ProductCard = ({ product }) => {
  const { wishlist, dispatch, productData } = useCart();
  const { login } = useAuth();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  if (login) {
    var user = JSON.parse(localStorage.getItem("user"));
  }
  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };
  const handleRemoveFromWishlist = (id) => {
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
        // console.log(deletedItem);
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

  const handleAddToWishlist = (id) => {
    (async () => {
      try {
        const obj = {
          userId: user._id,
          productId: id,
        };
        setloading(true);
        const { savedWishListItem } = await UseAxios("POST", wishlistUrl, obj);
        console.log(savedWishListItem);
        setloading(false);
        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: { itemId: savedWishListItem.productId },
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
        const { savedCartItem } = await UseAxios("POST", cartUrl, obj);
        // console.log(savedCartItem);
        dispatch({
          type: "ADD_TO_CART",
          payload: { newItem: savedCartItem },
        });
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  };
  return (
    <div className="card product-card">
      {loading ? (
        <Loader
          type="RevolvingDot"
          color="#2bc48a"
          height={100}
          width={100}
          timeout={2000}
        />
      ) : (
        <>
          {wishlist.find((item) => item?._id === product._id) ? (
            <button
              className="wishlist-badge wishlist-btn"
              onClick={() => handleRemoveFromWishlist(product._id)}
            >
              <i className="fa fa-heart"></i>
            </button>
          ) : (
            <button
              className="wishlist-badge wishlist-btn"
              onClick={() => {
                login ? handleAddToWishlist(product._id) : navigate("/login");
              }}
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
              login ? handleAddToCart(product._id) : navigate("/login")
            }
          >
            add to Cart
          </button>
          <button
            onClick={() => handleProductClick(product._id)}
            className="btn btn-secondary"
          >
            See Details
          </button>
        </>
      )}
    </div>
  );
};
