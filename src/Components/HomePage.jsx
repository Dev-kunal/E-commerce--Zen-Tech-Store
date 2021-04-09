import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="hero-img">
        <div className="hero-header">
          <h1>
            One Stop Shop for <br />
            your all Tech products
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="btn btn-lg btn-secondary"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};
