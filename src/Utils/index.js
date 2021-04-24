export const getSortedData = (productData, sortBy) => {
  if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
    return productData.sort((a, b) => a["price"] - b["price"]);
  }
  if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
    return productData.sort((a, b) => b["price"] - a["price"]);
  }
  return productData;
};

export const getFilteredData = (
  productData,
  { fastDeliveryOnly, inventoryAll }
) => {
  return productData
    .filter(({ fastDelivery }) => (fastDeliveryOnly ? fastDelivery : true))
    .filter(({ inStock }) => (inventoryAll ? true : inStock));
};
