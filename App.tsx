import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./hooks/useCart";
import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

import { Home } from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";



const App = () => {
  return (
      
      <CartProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/cart" >          
            <Cart />           
          </Route>
        </Switch>
        <ToastContainer />
      </CartProvider>
      
  );
};

export default App;
