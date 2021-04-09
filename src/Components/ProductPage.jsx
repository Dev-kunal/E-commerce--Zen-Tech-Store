import { useEffect, useRef, useState } from "react";
import { useCart } from "../CartContext";
import { FilterModal } from "./FilterModal";
import { Filters } from "./Filters";
import { ProductCard } from "./ProductCard";

export const ProductPage = () => {
  const {
    products,
    sortBy,
    fastDeliveryOnly,
    inventoryAll,
    showToast,
    toastMessage,
    dispatch,
  } = useCart();
  // const [displayfiltermodal, setfilters] = useState(false);
  const [sliderValue, setSliderValue] = useState(150000);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResult] = useState(products);
  const toast = useRef(null);

  if (showToast) {
    setTimeout(() => {
      toast.current.style.display = "none";
      dispatch({ type: "hideToast", payload: "HIDE_TOAST" });
    }, 1000);
  }
  useEffect(() => {
    setSearchResult(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      )
    );
  }, [searchTerm]);

  const getsortedData = (products, sortBy) => {
    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return products.sort((a, b) => a["price"] - b["price"]);
    }
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return products.sort((a, b) => b["price"] - a["price"]);
    }
    return products;
  };

  const getFilteredData = (products, { fastDeliveryOnly, inventoryAll }) => {
    return products
      .filter(({ fastDelivery }) => (fastDeliveryOnly ? fastDelivery : true))
      .filter(({ inStock }) => (inventoryAll ? true : inStock));
  };
  const sortedData = getsortedData(searchResults, sortBy);
  const filteredData = getFilteredData(sortedData, {
    fastDeliveryOnly,
    inventoryAll,
  });
  const filterByPrice = (products, priceRange) => {
    return products.filter(({ price }) => price <= priceRange);
  };
  const finalData = filterByPrice(filteredData, sliderValue);

  return (
    <>
      <div className="search">
        <input
          className="search-bar"
          placeholder="&#xF002; Search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{ fontFamily: "Arial,FontAwesome" }}
        />
      </div>

      <div className="product-page">
        <Filters sliderValue={sliderValue} setSliderValue={setSliderValue} />
        {/* {displayfiltermodal && <FilterModal />} */}
        {/* <div className="menu-bar">
          <div onClick={()=>setfilters(!displayfiltermodal)}>Filter</div>
          <div onClick={()=>setfilters(!displayfiltermodal)}>Sort BY</div>
        </div> */}
        <div className="product-container">
          <div className="header">Products</div>
          <div className="products">
            {finalData.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
        {showToast && (
          <div class="toast toast-n" ref={toast}>
            <p>{toastMessage}</p>
            <button class="btn toast-btn">X</button>
          </div>
        )}
      </div>
    </>
  );
};
