import { useRef, useEffect, useState } from "react";
import { useCart } from "../../Context/CartProvider";
import { useNavigate } from "react-router-dom";
import { RenderWishlistItems } from "./RenderWishlistItems";
import { UseAxios } from "../../Utils/UseAxios";
import Loader from "react-loader-spinner";
import { wishlistUrl } from "../../Utils/ApiEndpoints";
import { useAuth } from "../../Context/UserProvider";

export const WishlistPage = () => {
  const { wishlist, dispatch, showToast, toastMessage } = useCart();
  const { user } = useAuth();
  const [loading, setloading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }
  useEffect(() => {
    (async () => {
      try {
        if (wishlist.length < 1) {
          setloading(true);
          const { wishlist } = await UseAxios(
            "GET",
            wishlistUrl + `/${user._id}`
          );
          setloading(false);

          dispatch({
            type: "SET_WISHLIST",
            payload: { wishlist: wishlist.map((item) => item.productId) },
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="wishlist-page">
      {loading ? (
        <div className="loader-container">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={1000}
          />
        </div>
      ) : (
        <>
          {wishlist.length < 1 ? (
            <div className="empty-msg">
              <div className="msg">Your tech wishlist is empty</div>
              <br />
              <button
                onClick={() => navigate("/products")}
                className="btn btn-secondary no-shadow"
              >
                Shop best deals
              </button>
            </div>
          ) : (
            RenderWishlistItems({ wishlist, dispatch, setloading })
          )}
        </>
      )}
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </div>
  );
};
