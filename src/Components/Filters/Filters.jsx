import { useCart } from "../../Context/CartProvider";
import "./filters.css";

export const Filters = ({ sliderValue, setSliderValue }) => {
  const { sortBy, dispatch } = useCart();

  return (
    <aside className="filters">
      <div className="header">Filters</div>
      <form>
        <fieldset>
          <legend>Sort By Price</legend>
          <label>
            <input
              type="radio"
              name="sortPrice"
              onChange={() =>
                dispatch({
                  type: "PRICE_LOW_TO_HIGH",
                })
              }
              checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            />
            Low To High
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="sortPrice"
              onChange={() =>
                dispatch({
                  type: "PRICE_HIGH_TO_LOW",
                })
              }
              checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            />
            Hight To Low
          </label>
        </fieldset>
        <fieldset>
          <legend>Include Delivery Type</legend>
          <label>
            <input
              type="checkbox"
              onChange={() =>
                dispatch({
                  type: "TOGGLE_FAST_DELIVERY",
                })
              }
            />
            Fast Delivery
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              onChange={() =>
                dispatch({
                  type: "TOGGLE_INVENTORY",
                })
              }
            />
            In Stock
          </label>
        </fieldset>
        <fieldset>
          <legend></legend>
          <label className="price-range">
            Price Range
            <br />
            <input
              value={sliderValue}
              onChange={(event) => setSliderValue(event.target.value)}
              type="range"
              className="slider"
              min="5000"
              max="200000"
            />
            <br />
            5000 - {sliderValue} ₹
          </label>
        </fieldset>
      </form>
    </aside>
  );
};
