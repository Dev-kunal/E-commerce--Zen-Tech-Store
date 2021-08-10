import { UseAxios } from "../../Utils/UseAxios";

export const loadCart = async ({ dispatch, setLoading }) => {
  try {
    setLoading(true);
    const { cart } = await UseAxios("GET", "/cart");
    dispatch({
      type: "SET_CART",
      payload: { cart },
    });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const updateQuantity = async ({ type, id, dispatch, setBtnLoader }) => {
  try {
    const body = {
      productId: id,
      updateType: type,
    };
    setBtnLoader(true);
    const { updatedProduct } = await UseAxios("POST", `cart/update`, body);
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { updatedProduct },
    });
    setBtnLoader(false);
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async ({ id, dispatch, setLoading }) => {
  try {
    const body = {
      productId: id,
    };
    setLoading(true);
    const { removedCartItem } = await UseAxios("POST", `cart/remove`, body);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { itemId: removedCartItem.productId },
    });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
