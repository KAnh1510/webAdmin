const VndFormat = (price) => {
  price = price.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return price;
};

export default VndFormat;
