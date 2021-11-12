import { useState } from "react";
import { useParams } from "react-router";
import Product from "../components/Product";
import useFetch from "../hooks/useFetch";

const ProductDetails = () => {
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const { id } = useParams();
  const { data, isFetching, error } = useFetch(
    "http://localhost:8081/api/products/" + id,
    "GET",
    {},
    false
  );

  const buy = (e) => {
    e.preventDefault();
    const order = {
      productName: data.name,
      productPrice: data.price,
      productQuantity: parseInt(productQuantity),
      receiverName,
      receiverAddress,
      receiverPhone,
    };

    setIsPending(true);

    fetch("http://localhost:8081/api/orders/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).then(() => {
      setReceiverAddress("");
      setReceiverName("");
      setReceiverPhone("");
      setProductQuantity(1);
      setIsPending(false);
    });
  };

  return (
    <div className="blog-details-container">
      <div className="blog-details product-content">
        {error && <div>{error}</div>}
        {isFetching && <div>Loading data...</div>}
        {data && <Product product={data} />}
      </div>

      <form onSubmit={buy} className="form product-content">
        <h2 className="form-title">Order form</h2>
        <div className="form-container">
          <label>Receiver name:</label>
          <input
            type="text"
            required
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
          <label>Receiver address:</label>
          <input
            type="text"
            required
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
          />
          <label>Receiver phone:</label>
          <input
            type="text"
            required
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
          />
          <label>Quantity:</label>
          <input
            type="number"
            required
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
          {!isPending && <button type="submit">Buy</button>}
          {isPending && (
            <button disabled type="submit">
              Creating order...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductDetails;
