const Order = ({ order, index }) => {
  return (
    <div className="order-container">
      <p className="order-field stt">{index}</p>
      <p className="order-field receiver-name">{order.receiverName}</p>
      <p className="order-field receiver-address">{order.receiverAddress}</p>
      <p className="order-field receiver-phone">{order.receiverPhone}</p>
      <p className="order-field product-name">{order.productName}</p>
      <p className="order-field product-quantity">{order.productQuantity}</p>
      <p className="order-field order-status">{order.status}</p>
      <p className="order-field order-date">{order.createdDate.split("T")[0]}</p>
    </div>
  );
};

export default Order;
