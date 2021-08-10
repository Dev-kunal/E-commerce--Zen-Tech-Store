import { useEffect, useRef, useState } from "react";
import { useCart } from "../../Context/CartProvider";
import { Filters } from "../Filters/Filters";
import { ProductCard } from "../ProductCard/ProductCard";
import { getSortedData, getFilteredData } from "../../Utils";
import Loader from "react-loader-spinner";
import "./product-page.css";
import { getProducts } from "./services";

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
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }
  useEffect(() => {
    getProducts({ setLoading, dispatch });
  }, []);

  const sortedData = getSortedData(productData, sortBy);
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
      {productData.length < 1 ? (
        <div className="loader-container">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      ) : (
        <>
          <div className="product-page">
            <Filters
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
            />
            <div className="product-container">
              <div className="header">Products</div>
              <div className="products">
                {finalData.map((product) => (
                  <ProductCard product={product} key={product._id} />
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
      )}
    </>
  );
};
