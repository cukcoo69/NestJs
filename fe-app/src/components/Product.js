const Product = ({ product }) => {
  return (
    <div className="blog-preview">
      <img src={product.image} alt={product.name}></img>
      <h3>{product.name}</h3>
      <p>Price: {product.price.toLocaleString()}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default Product;
