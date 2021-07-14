import { useCart } from "../../Context/CartProvider";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../Context/UserProvider";

export const Navbar = () => {
  const { itemsInCart, wishlist } = useCart();
  const { token } = useAuth();

  return (
    <div className="navbar navbar-right">
      <div className="nav-brand">
        <img src="./technology-products.svg" alt="logo" className="brand-img" />
        <Link className="nav-brand-heading" to="/">
          Zen Tech Store
        </Link>
      </div>
      <div className="nav-group">
        {/* <div className="nav-item">{login}</div> */}
        <div className="nav-item">
          <NavLink end activeClassName="active" to="/products">
            Products
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink activeClassName="active" to="/cart">
            <i className="fa fa-shopping-cart" />
          </NavLink>
          <span className="badge badge-icon badge-primary">
            {itemsInCart.length}
          </span>
        </div>
        <div className="nav-item">
          <NavLink activeClassName="active" to="/wishlist">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </NavLink>
          <span className="badge badge-icon badge-primary">
            {wishlist?.length}
          </span>
        </div>
        <div className="nav-item">
          {token && (
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
