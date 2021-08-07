const itemsInCart = [];
const wishlist = [];
const productData = [];
export const initialState = {
  productData,
  itemsInCart,
  wishlist,
  loadWishlistChanges: false,
  loadCartChanges: false,
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
        itemsInCart: payload.cart,
      };
    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: payload.wishlist,
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        showToast: true,
        loadWishlistChanges: true,
        toastMessage: "Product Added To Wishlist",
        wishlist: [...state.wishlist, payload.newItemInWishlist],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: "Product Removed From Wishlist",
        wishlist: state.wishlist.filter(
          (item) => item.productId._id !== payload.itemId
        ),
      };
    case "ADD_TO_CART":
      return {
        ...state,
        showToast: true,
        loadCartChanges: true,
        toastMessage: "Product Added To Cart",
        itemsInCart: [...state.itemsInCart, payload.newCartItem],
      };
    case "ADD_TO_CART_FROM_WISHLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: "Product Added To Cart",
        itemsInCart: [...state.itemsInCart, payload.newCartItem],
        wishlist: state.wishlist.filter(
          (item) => item.productId._id !== payload.newCartItem.productId._id
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        showToast: true,
        toastMessage: "Product Removed From Cart",
        itemsInCart: state.itemsInCart.filter(
          (item) => item.productId._id !== payload.itemId
        ),
      };
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
    case "UPDATE_QUANTITY":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item.productId._id === payload.updatedProduct.productId._id
            ? payload.updatedProduct
            : item
        ),
      };
    case "ORDER_PLACED":
      return {
        ...state,
        itemsInCart: [],
        showToast: true,
        toastMessage: payload.message,
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
