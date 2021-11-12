import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Order App</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </nav>
  );
};

export default Navbar;
