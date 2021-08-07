import { useCart } from "../../Context/CartProvider";
import { useNavigate } from "react-router-dom";
import "./product-card.css";
import { useAuth } from "../../Context/UserProvider";
import Loader from "react-loader-spinner";
import { useState } from "react";
import { UseAxios } from "../../Utils/UseAxios";

export const ProductCard = ({ product }) => {
  const { wishlist, dispatch, itemsInCart } = useCart();
  const { token } = useAuth();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const productClick = (id) => {
    navigate(`/products/${id}`);
  };
  const removeFromWishlist = (id) => {
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

  const addToWishlist = (id) => {
    console.log("Inside wihslist");
    (async () => {
      try {
        const obj = {
          productId: id,
        };
        setloading(true);
        const { newItemInWishlist } = await UseAxios("POST", "/wishlist", obj);
        console.log(newItemInWishlist);
        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: { newItemInWishlist },
        });
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const addToCart = (id) => {
    (async () => {
      try {
        const obj = {
          productId: id,
        };
        setloading(true);
        if (
          itemsInCart.filter((product) => product.productId._id === id).length
        ) {
          setloading(false);
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: "Product is already present Cart" },
          });
        } else {
          const { newCartItem } = await UseAxios("POST", "/cart", obj);
          dispatch({
            type: "ADD_TO_CART",
            payload: { newCartItem },
          });
        }

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
          {wishlist?.some((item) => item?.productId._id === product._id) ? (
            <button
              className="wishlist-badge wishlist-btn"
              onClick={() => removeFromWishlist(product._id)}
            >
              <i className="fa fa-heart"></i>
            </button>
          ) : (
            <button
              className="wishlist-badge wishlist-btn"
              onClick={() => {
                token ? addToWishlist(product._id) : navigate("/login");
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
              token ? addToCart(product._id) : navigate("/login")
            }
          >
            add to Cart
          </button>
          <button
            onClick={() => productClick(product._id)}
            className="btn btn-secondary"
          >
            See Details
          </button>
        </>
      )}
    </div>
  );
};
