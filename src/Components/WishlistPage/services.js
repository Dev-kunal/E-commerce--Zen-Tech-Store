import { UseAxios } from "../../Utils/UseAxios";

export const loadWishlist = async ({ dispatch, setloading }) => {
  try {
    setloading(true);
    const { wishlist } = await UseAxios("GET", "/wishlist");
    setloading(false);
    dispatch({
      type: "SET_WISHLIST",
      payload: { wishlist },
    });
  } catch (error) {
    console.log(error);
  }
};
export const removeItemFromWishlist = async ({ id, dispatch, setloading }) => {
  try {
    const body = {
      productId: id,
    };
    setloading(true);
    const { deletedItem, message } = await UseAxios(
      "POST",
      `wishlist/remove`,
      body
    );
    console.log(deletedItem, message);
    setloading(false);
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: { itemId: deletedItem.productId },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = ({ id, itemsInCart, dispatch, setloading }) => {
  if (itemsInCart.filter((product) => product.productId._id === id).length) {
    dispatch({
      type: "SHOW_TOAST",
      payload: { message: "Product is already present Cart" },
    });
  } else {
    (async () => {
      try {
        const body = {
          productId: id,
        };
        setloading(true);
        const { success, newCartItem, message } = await UseAxios(
          "POST",
          `wishlist/addtocart`,
          body
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
