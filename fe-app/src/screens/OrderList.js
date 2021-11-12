import Order from "../components/Order";
import useFetch from "../hooks/useFetch";

const OrderList = () => {
  const { data, isFetching, error } = useFetch(
    "http://localhost:8081/api/orders",
    "GET",
    {},
    true
  );

  return (
    <div className="create">
      <h2 className="order-title">List order</h2>
      <div className="order-container">
        <p className="order-field stt order-header">STT</p>
        <p className="order-field receiver-name order-header">Receiver name</p>
        <p className="order-field receiver-address order-header">Address</p>
        <p className="order-field receiver-phone order-header">Phone number</p>
        <p className="order-field product-name order-header">Product name</p>
        <p className="order-field product-quantity order-header">Quantity</p>
        <p className="order-field order-status order-header">Status</p>
        <p className="order-field order-date order-header">Create date</p>
      </div>
      {isFetching && <div>Loading data...</div>}
      {error && <div>{error}</div>}
      {data &&
        data.map((order, index) => <Order order={order} index={index + 1} key={index + 1} />)}
    </div>
  );
};

export default OrderList;
