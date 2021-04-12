import { useCart } from "../../CartContext";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const { itemsInCart, wishlist } = useCart();

  const cartlength = itemsInCart.reduce((accu, item) => {
    return item.quantity + accu;
  }, 0);

  return (
    <div className="navbar navbar-right">
      <div className="nav-brand">
        <img src="./technology-products.svg" alt="logo" className="brand-img" />
        <Link className="nav-brand-heading" to="/">
          Zen Tech Store
        </Link>
      </div>
      <div className="nav-group">
        <div className="nav-item">
          <NavLink end activeClassName="active" to="/products">
            Products
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink activeClassName="active" to="/cart">
            <i className="fa fa-shopping-cart" />
          </NavLink>
          <span className="badge badge-icon badge-primary">{cartlength}</span>
        </div>
        <div className="nav-item">
          <NavLink activeClassName="active" to="/wishlist">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </NavLink>
          <span className="badge badge-icon badge-primary">
            {wishlist.length}
          </span>
        </div>
      </div>
    </div>
  );
};
