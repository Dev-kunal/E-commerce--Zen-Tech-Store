import { UseAxios } from "../../Utils/UseAxios";

export const addToCart = async ({
  id,
  dispatch,
  itemsInCart,
  setCartLoader,
}) => {
  try {
    const body = {
      productId: id,
    };
    setCartLoader(true);
    if (itemsInCart.filter((product) => product.productId._id === id).length) {
      setCartLoader(false);
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Product is already present Cart" },
      });
    } else {
      const { newCartItem } = await UseAxios("POST", "/cart", body);
      setCartLoader(false);
      dispatch({
        type: "ADD_TO_CART",
        payload: { newCartItem },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToWishlist = async ({ id, dispatch, setWishlistLoader }) => {
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
};

export const removeFromWishlist = async ({
  id,
  dispatch,
  setWishlistLoader,
}) => {
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
};
