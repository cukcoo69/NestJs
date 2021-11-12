import ProductList from "./ProductList";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data, isFetching, error } = useFetch(
    "http://localhost:8081/api/products",
    // "order-app:8081/api/products",
    "GET",
    {},
    true
  );

  return (
    <div className="home">
      <h1
        style={{ color: "#f1356d", textAlign: "center", marginBottom: "20px" }}
      >
        Wellcome to the store
      </h1>
      {isFetching && <div>Loading data...</div>}
      {error && <div>{error}</div>}
      {data && <ProductList products={data} />}
    </div>
  );
};

export default Home;
