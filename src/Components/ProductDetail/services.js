import { UseAxios } from "../../Utils/UseAxios";

export const loadProduct = async ({ productId, setProduct, setLoading }) => {
  try {
    setLoading(true);
    const response = await UseAxios("GET", `/products/${productId}`);
    setProduct(response.product);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const addToWishlist = async ({
  token,
  id,
  dispatch,
  setWishlistLoader,
}) => {
  if (token) {
    try {
      const body = {
        productId: id,
      };
      setWishlistLoader(true);
      const { newItemInWishlist } = await UseAxios("POST", "/wishlist", body);
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: { newItemInWishlist },
      });
      setWishlistLoader(false);
    } catch (error) {
      console.log(error);
    }
  } else {
    navigate("/login");
  }
};

export const addToCart = async ({
  token,
  id,
  dispatch,
  setCartLoader,
  itemsInCart,
}) => {
  if (token) {
    (async () => {
      try {
        const obj = {
          productId: id,
        };
        setCartLoader(true);
        if (
          itemsInCart.filter((product) => product.productId._id === id).length
        ) {
          setCartLoader(false);
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: "Product is already present Cart" },
          });
        } else {
          const { newCartItem } = await UseAxios("POST", "/cart", obj);
          setCartLoader(false);
          dispatch({
            type: "ADD_TO_CART",
            payload: { newCartItem },
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    navigate("/login");
  }
};
export const removeFromWishlist = async ({
  id,
  token,
  setWishlistLoader,
  dispatch,
}) => {
  if (token) {
    try {
      const body = {
        productId: id,
      };
      setWishlistLoader(true);
      const { deletedItem } = await UseAxios("POST", `wishlist/remove`, body);
      setWishlistLoader(false);
      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { itemId: deletedItem.productId },
      });
    } catch (error) {
      console.log(error);
    }
  }
};
