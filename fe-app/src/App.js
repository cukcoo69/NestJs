import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OrderList from "./screens/OrderList";
import ProductDetails from "./screens/ProductDetails";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/orders">
              <OrderList />
            </Route>
            <Route exact path="/products/:id">
              <ProductDetails />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
