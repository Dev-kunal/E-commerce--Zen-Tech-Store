// import { productData } from "../../Data";

const itemsInCart = [];
const wishlist = [];
const productData = [];
export const initialState = {
  productData,
  itemsInCart,
  wishlist,
  showToast: false,
  toastMessage: "",
  sortBy: null,
  fastDeliveryOnly: false,
  inventoryAll: true,
  searchResult: [],
};

export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGOUT":
      return {
        ...initialState,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        productData: payload.products,
      };
    case "SET_CART":
      return {
        ...state,
        itemsInCart: payload.cartItems,
      };
    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: payload.wishlist,
      };
    case "ADD_TO_CART":
      if (state.itemsInCart.find((item) => item.id === payload.newItem.id)) {
        return {
          ...state,
          showToast: true,
          toastMessage: "Product Added To Cart",
          itemsInCart: state.itemsInCart.map((item) =>
            item._id === payload.newItem._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          showToast: true,
          toastMessage: "Product Added To Cart",
          itemsInCart: state.itemsInCart.concat(payload.newItem),
        };
      }
    case "SHOW_TOAST":
      return {
        ...state,
        showToast: true,
        toastMessage: payload.message,
      };
    case "HIDE_TOAST":
      return {
        ...state,
        showToast: false,
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === payload.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === payload.itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        showToast: true,
        toastMessage: "Product Removed From Cart",
        itemsInCart: state.itemsInCart.filter(
          (item) => item._id !== payload.itemId
        ),
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: "Product Added To Wishlist",
        wishlist: [
          ...state.wishlist,
          productData.find((product) => product._id === payload.itemId),
        ],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: "Product Removed From Wishlist",
        wishlist: state.wishlist.filter((item) => item._id !== payload.itemId),
      };
    case "PRICE_LOW_TO_HIGH":
      return {
        ...state,
        sortBy: type,
      };
    case "PRICE_HIGH_TO_LOW":
      return {
        ...state,
        sortBy: type,
      };
    case "TOGGLE_FAST_DELIVERY":
      return (state = { ...state, fastDeliveryOnly: !state.fastDeliveryOnly });
    case "TOGGLE_INVENTORY":
      return (state = { ...state, inventoryAll: !state.inventoryAll });

    default:
      return { state };
  }
};
