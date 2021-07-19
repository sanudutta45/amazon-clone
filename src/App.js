import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//context value
import { useContextValue } from "./Content/contextProvider";

//components
import Home from "./Home/Home";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Checkout from "./Checkout/Checkout";
import Payment from "./Payment/Payment.jsx";

//css
import "./App.css";

const promise = loadStripe(
  "pk_test_51JEX28SGuupH65hWO0sbnZPgC5nhRcNJtWG2I0jXujCiPyElU2IoaLCGCWzObLTGaVRLAg2WGeLAEeHzEPfMPe9W00IotKVbtQ"
);

function App() {
  const [, dispatch] = useContextValue();

  useEffect(() => {
    return auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
