export const FilterModal = () => {
  return (
    <div className="filter-modal">
      <fieldset>
        <legend>Sort By Price</legend>
        <label>
          <input type="radio" name="sortPrice" />
          Low To High
        </label>
        <br />
        <label>
          <input type="radio" name="sortPrice" />
          Hight To Low
        </label>
      </fieldset>
      <fieldset>
        <legend>Include Delivery Type</legend>
        <label>
          <input type="checkbox" />
          Fast Delivery
        </label>
        <br />
        <label>
          <input type="checkbox" />
          In Stock
        </label>
      </fieldset>
    </div>
  );
};
