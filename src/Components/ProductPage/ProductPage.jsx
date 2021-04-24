import { useEffect, useRef, useState } from "react";
import { useCart } from "../../Context/CartProvider";
import { Filters } from "../Filters/Filters";
import { ProductCard } from "../ProductCard/ProductCard";
import { getSortedData, getFilteredData } from "../../Utils";
import "./product-page.css";

export const ProductPage = () => {
  const {
    productData,
    sortBy,
    fastDeliveryOnly,
    inventoryAll,
    showToast,
    toastMessage,
    dispatch,
  } = useCart();

  const [sliderValue, setSliderValue] = useState(150000);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResult] = useState(productData);
  const toast = useRef(null);

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }
  useEffect(() => {
    setSearchResult(
      productData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      )
    );
  }, [searchTerm]);

  // const getsortedData = (productData, sortBy) => {
  //   if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
  //     return productData.sort((a, b) => a["price"] - b["price"]);
  //   }
  //   if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
  //     return productData.sort((a, b) => b["price"] - a["price"]);
  //   }
  //   return productData;
  // };
  // const getFilteredData = (productData, { fastDeliveryOnly, inventoryAll }) => {
  //   return productData
  //     .filter(({ fastDelivery }) => (fastDeliveryOnly ? fastDelivery : true))
  //     .filter(({ inStock }) => (inventoryAll ? true : inStock));
  // };
  const sortedData = getSortedData(searchResults, sortBy);
  const filteredData = getFilteredData(sortedData, {
    fastDeliveryOnly,
    inventoryAll,
  });
  const filterByPrice = (productData, priceRange) => {
    return productData.filter(({ price }) => price <= priceRange);
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
        <div className="product-container">
          <div className="header">Products</div>
          <div className="products">
            {finalData.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
        {showToast && (
          <div className="toast toast-n" ref={toast}>
            <p>{toastMessage}</p>
            <button className="btn toast-btn">X</button>
          </div>
        )}
      </div>
    </>
  );
};
