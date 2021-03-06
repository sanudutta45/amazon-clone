import React from "react";
import { useHistory } from "react-router";
import CurrencyFormat from "react-currency-format";

//context
import { useContextValue } from "../Content/contextProvider";

//selector
import { getBasketTotal } from "../Content/reducer";
//css
import Style from "./Subtotal.module.css";

const Subtotal = () => {
  const history = useHistory();
  const [{ basket }] = useContextValue();

  return (
    <div className={Style.subtotal}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className={Style.gift}>
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={() => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
