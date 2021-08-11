import { cartReducer } from "./reducer";

describe("Testing Cart Reducer", () => {
  test("Should set products to initialState", () => {
    const initialState = {
      productData: [],
    };
    const payload = {
      products: [
        { name: "item 1", price: 20000 },
        { name: "item 1", price: 20000 },
      ],
    };
    const setProducts = {
      type: "SET_PRODUCTS",
      payload,
    };
    const finalState = {
      ...initialState,
      productData: payload.products,
    };
    expect(finalState).toEqual(cartReducer(initialState, setProducts));
  });

  test("Should add items to cart", () => {
    const initialState = {
      itemsInCart: [],
    };
    const payload = {
      cart: [
        { name: "item 1", price: 20000, quantity: 1 },
        { name: "item 1", price: 20000, quantity: 1 },
      ],
    };
    const setCart = {
      type: "SET_CART",
      payload,
    };
    const finalState = {
      ...initialState,
      itemsInCart: payload.cart,
    };
    expect(finalState).toEqual(cartReducer(initialState, setCart));
  });

  test("Should set Wishlist", () => {
    const initialState = {
      wishlist: [],
    };
    const payload = {
      wishlist: [
        { name: "item 1", price: 20000 },
        { name: "item 1", price: 20000 },
      ],
    };
    const setWishlist = {
      type: "SET_WISHLIST",
      payload,
    };
    const finalState = {
      ...initialState,
      wishlist: payload.wishlist,
    };
    expect(finalState).toEqual(cartReducer(initialState, setWishlist));
  });

  test("Should add item to wishlist", () => {
    const initialState = {
      wishlist: [],
      showToast: false,
      toastMessage: "",
    };
    const payload = {
      newItemInWishlist: {
        name: "new item",
        price: 4000,
      },
    };
    const AddToWishlist = {
      type: "ADD_TO_WISHLIST",
      payload,
    };
    const finalState = {
      showToast: true,
      toastMessage: "Product Added To Wishlist",
      wishlist: [...initialState.wishlist, payload.newItemInWishlist],
    };

    expect(finalState).toEqual(cartReducer(initialState, AddToWishlist));
  });
  test("Should remove item from wishlist", () => {
    const initialState = {
      wishlist: [
        {
          productId: {
            _id: 1,
            name: "new item",
            price: 4300,
          },
        },
        {
          productId: {
            _id: 2,
            name: "new item2",
            price: 4000,
          },
        },
      ],
      showToast: false,
      toastMessage: "",
    };
    const payload = {
      itemId: 1,
    };
    const removeFromWishlist = {
      type: "REMOVE_FROM_WISHLIST",
      payload,
    };
    const finalState = {
      showToast: true,
      toastMessage: "Product Removed From Wishlist",
      wishlist: [
        {
          productId: {
            _id: 2,
            name: "new item2",
            price: 4000,
          },
        },
      ],
    };
    expect(finalState).toEqual(cartReducer(initialState, removeFromWishlist));
  });
  test("Should add to cart", () => {
    const initialState = {
      itemsInCart: [
        {
          _id: 1,
          name: "new item",
          price: 4300,
          quantity: 1,
        },
      ],
      showToast: false,
      toastMessage: "",
    };
    const payload = {
      newCartItem: {
        _id: 1,
        name: "new item",
        price: 4300,
        quantity: 1,
      },
    };
    const addToCart = {
      type: "ADD_TO_CART",
      payload,
    };
    const finalState = {
      showToast: true,
      toastMessage: "Product Added To Cart",
      itemsInCart: [...initialState.itemsInCart, payload.newCartItem],
    };
    expect(finalState).toEqual(cartReducer(initialState, addToCart));
  });

  test("Should Remove item from cart", () => {
    const initialState = {
      itemsInCart: [
        {
          productId: { _id: 1, name: "new item", price: 4300, quantity: 1 },
        },
        {
          productId: {
            _id: 2,
            name: "new item2",
            price: 430,
            quantity: 1,
          },
        },
      ],
      showToast: false,
      toastMessage: "",
    };
    const payload = {
      itemId: 1,
    };
    const removeFromCart = {
      type: "REMOVE_FROM_CART",
      payload,
    };
    const finalState = {
      showToast: true,
      toastMessage: "Product Removed From Cart",
      itemsInCart: [
        {
          productId: { _id: 2, name: "new item2", price: 430, quantity: 1 },
        },
      ],
    };
    expect(finalState).toEqual(cartReducer(initialState, removeFromCart));
  });
  test("Should add to cart from wishlist", () => {
    const initialState = {
      wishlist: [
        {
          productId: {
            _id: 2,
            name: "new item2",
            price: 430,
            quantity: 1,
          },
        },
      ],
      itemsInCart: [],
      showToast: false,
      toastMessage: "",
    };
    const payload = {
      newCartItem: {
        productId: {
          _id: 2,
          name: "new item2",
          price: 430,
          quantity: 1,
        },
      },
    };
    const addToCartFromWishlist = {
      type: "ADD_TO_CART_FROM_WISHLIST",
      payload,
    };
    const finalState = {
      showToast: true,
      toastMessage: "Product Added To Cart",
      wishlist: [],
      itemsInCart: [
        {
          productId: {
            _id: 2,
            name: "new item2",
            price: 430,
            quantity: 1,
          },
        },
      ],
    };
    expect(finalState).toEqual(
      cartReducer(initialState, addToCartFromWishlist)
    );
  });
  test("Should increase quantity of cartItem", () => {
    const initialState = {
      itemsInCart: [
        {
          _id: 2,
          name: "new item2",
          price: 430,
          quantity: 1,
        },
      ],
    };
    const payload = {
      itemId: 2,
    };
    const increaseQuantity = {
      type: "INCREASE_QUANTITY",
      payload,
    };
    const finalState = {
      itemsInCart: [
        {
          _id: 2,
          name: "new item2",
          price: 430,
          quantity: 2,
        },
      ],
    };
    expect(finalState).toEqual(cartReducer(initialState, increaseQuantity));
  });
  test("Should decrease quantity of cartItem", () => {
    const initialState = {
      itemsInCart: [
        {
          _id: 2,
          name: "new item2",
          price: 430,
          quantity: 3,
        },
      ],
    };
    const payload = {
      itemId: 2,
    };
    const decreaseQunatity = {
      type: "DECREASE_QUANTITY",
      payload,
    };
    const finalState = {
      itemsInCart: [
        {
          _id: 2,
          name: "new item2",
          price: 430,
          quantity: 2,
        },
      ],
    };
    expect(finalState).toEqual(cartReducer(initialState, decreaseQunatity));
  });
});
