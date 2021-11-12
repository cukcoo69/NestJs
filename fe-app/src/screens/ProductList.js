import { Link } from "react-router-dom";
import Product from "../components/Product";

const ProductList = (props) => {
  const products = props.products;

  return (
    <div className="blog-list">
      {products.map((product) => (
        <div key={product._id}>
          <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }} >
            <Product product={product} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
