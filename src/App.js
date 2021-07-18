import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";

//context value
import { useContextValue } from "./Content/contextProvider";

//components
import Home from "./Home/Home";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Checkout from "./Checkout/Checkout";

//css
import "./App.css";

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
  }, []);
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
