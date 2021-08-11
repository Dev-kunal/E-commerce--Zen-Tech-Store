import { UseAxios } from "../../Utils/UseAxios";

export const getProducts = async ({ setLoading, dispatch }) => {
  try {
    setLoading(true);
    const { success, message, products } = await UseAxios("GET", "/products");
    setLoading(false);
    if (success) {
      dispatch({
        type: "SET_PRODUCTS",
        payload: { products: products },
      });
    } else {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: message },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
