import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UseAxios } from "../../Utils/UseAxios";
import { loginUrl, userUrl } from "../../Utils/ApiEndpoints";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import "./auth.css";
import { useAuth } from "../../Context/UserProvider";
import { useCart } from "../../Context/CartProvider";

export const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, userDispatch } = useAuth();
  const toast = useRef(null);
  const { showToast, toastMessage, dispatch } = useCart();
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }
  if (user) {
    navigate("/products");
  }

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevdetails) => {
      return {
        ...prevdetails,
        [name]: value,
      };
    });
  };
  const handleFormSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const obj = userDetails;
    (async () => {
      try {
        const response = await UseAxios("POST", loginUrl, obj);
        console.log(response);
        if (response.success) {
          userDispatch({
            type: "SET_LOGIN",
            payload: { user: response.user, login: true },
          });
          localStorage.setItem("user", JSON.stringify(response.user));
          setUserDetails({
            username: "",
            password: "",
          });
          setLoading(false);
          navigate(state.from);
        } else {
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: "Enter Correct Username and Password" },
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  };
  return (
    <div className="login-page">
      <div className="form-container">
        <div className="form-header">
          <h2 style={{ margin: "1rem auto" }}>Login</h2>
        </div>
        <form
          onSubmit={(event) => handleFormSubmit(event)}
          className="auth-form"
        >
          <div class="input-group">
            <label class="input-label" for="input-uname">
              Username
            </label>
            <input
              class="input input-lg"
              type="text"
              id="input-uname"
              placeholder="user@gmail.com"
              name="username"
              required
              value={userDetails.username}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div class="input-group">
            <label class="input-label" for="input-pass">
              Password
            </label>
            <input
              class="input input-lg"
              type="password"
              id="input-pass"
              placeholder="password"
              name="password"
              required
              value={userDetails.password}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <button type="submit" className="btn btn-lg">
            Login
          </button>
          <br />
          <span>
            <small>
              Not a member..? <Link to="/signup">Signup</Link>
            </small>
          </span>
        </form>
      </div>
      {loading && (
        <div className="loader-container">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={2000}
          />
        </div>
      )}
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </div>
  );
};
