import { createContext, useContext, useReducer } from "react";
import { productData } from "./Data";

const CartContext = createContext();

const itemsInCart = [];
const wishlist = [];

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    productData,
    itemsInCart,
    wishlist,
    showToast: false,
    toastMessage: "",
    sortBy: null,
    fastDeliveryOnly: false,
    inventoryAll: true,
    searchResult: []
  });
  // console.log(state.productData);
  return (
    <CartContext.Provider
      value={{
        products: state.productData,
        itemsInCart: state.itemsInCart,
        wishlist: state.wishlist,
        sortBy: state.sortBy,
        fastDeliveryOnly: state.fastDeliveryOnly,
        inventoryAll: state.inventoryAll,
        showToast: state.showToast,
        toastMessage: state.toastMessage,
        searchResult: state.searchResult,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

const cartReducer = (state, action) => {
  switch (action.payload) {
    case "ADD_TO_CART":
      if (state.itemsInCart.find((item) => item.id === action.newItem.id)) {
        return {
          ...state,
          showToast: true,
          toastMessage: "Product Added To Cart",
          itemsInCart: state.itemsInCart.map((item) =>
            item.id === action.newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          showToast: true,
          toastMessage: "Product Added To Cart",
          itemsInCart: state.itemsInCart.concat(action.newItem)
        };
      }

    case "HIDE_TOAST":
      return {
        ...state,
        showToast: false
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        showToast: true,
        toastMessage: "Product Removed From Cart",
        itemsInCart: state.itemsInCart.filter(
          (item) => item.id !== action.itemId
        )
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: "Product Added To Wishlist",
        wishlist: [...state.wishlist, action.item]
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: "Product Removed From Wishlist",
        wishlist: state.wishlist.filter((item) => item.id !== action.itemId)
      };
    case "PRICE_LOW_TO_HIGH":
      return {
        ...state,
        sortBy: action.payload
      };
    case "PRICE_HIGH_TO_LOW":
      return {
        ...state,
        sortBy: action.payload
      };
    case "TOGGLE_FAST_DELIVERY":
      return (state = { ...state, fastDeliveryOnly: !state.fastDeliveryOnly });
    case "TOGGLE_INVENTORY":
      return (state = { ...state, inventoryAll: !state.inventoryAll });

    case "SEARCH_FILTER":
      console.log(action.filterTerm);
      return (state = {
        ...state,
        productData: state.productData.filter((product) =>
          product.name.toLowerCase().includes(action.filterTerm)
        )
      });

      
    default:
      return { state };
  }
};
