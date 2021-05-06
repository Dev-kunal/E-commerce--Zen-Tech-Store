import { useCart } from "../../Context/CartProvider";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../Context/UserProvider";
import { UseAxios } from "../../Utils/UseAxios";
import { cartUrl, userUrl, wishlistUrl } from "../../Utils/ApiEndpoints";

export const Navbar = () => {
  const { itemsInCart, wishlist, dispatch } = useCart();
  const { login, user } = useAuth();
  console.log(user);
  if (login) {
    (async () => {
      try {
        const { wishlist } = await UseAxios(
          "GET",
          wishlistUrl + `/${user._id}`
        );
        // dispatch({
        //   type: "SET_WISHLIST",
        //   payload: { wishlist: wishlist.map((item) => item.productId) },
        // });
      } catch (err) {
        console.log(err);
      }
    })();
    (async () => {
      try {
        const { cart } = await UseAxios("GET", cartUrl + `/${user._id}`);
        // dispatch({
        //   type: "SET_CART",
        //   payload: { cartItems: cart.map((item) => item.productId) },
        // });
      } catch (err) {
        console.log(err);
      }
    })();
  }

  const cartlength = itemsInCart.length;
  return (
    <div className="navbar navbar-right">
      <div className="nav-brand">
        <img src="./technology-products.svg" alt="logo" className="brand-img" />
        <Link className="nav-brand-heading" to="/">
          Zen Tech Store
        </Link>
      </div>
      <div className="nav-group">
        <div className="nav-item">{login}</div>
        <div className="nav-item">
          <NavLink end activeClassName="active" to="/products">
            Products
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink active to="/cart">
            <i className="fa fa-shopping-cart" />
          </NavLink>
          <span className="badge badge-icon badge-primary">{cartlength}</span>
        </div>
        <div className="nav-item">
          <NavLink active to="/wishlist">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </NavLink>
          <span className="badge badge-icon badge-primary">
            {wishlist.length}
          </span>
        </div>
        <div className="nav-item">
          {login && (
            <Link to="/user">
              <img
                className="avatar-small user"
                src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png"
                alt="Avatar"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
