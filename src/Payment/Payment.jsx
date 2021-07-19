import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../Actions/apiCall";
//context
import { useContextValue } from "../Content/contextProvider";

//component
import CheckoutProduct from "../Checkout/CheckoutProduct";
//css
import Style from "./Payment.module.css";
import { getBasketTotal } from "../Content/reducer";

const Payment = () => {
  const [{ basket, user }] = useContextValue();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [succeeded, setSucceeded] = useState();
  const [processing, setProcessing] = useState();
  const [clientSecret, setClientSecret] = useState();

  const history = useHistory();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });

      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    try {
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      history.replaceState("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (ev) => {
    setDisabled(ev.empty);
    setError(ev.error ? ev.error.message : "");
  };

  return (
    <div className={Style.payment}>
      <div className={Style.container}>
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className={Style.section}>
          <div className={Style.title}>
            <h3>Delivery Address</h3>
          </div>
          <div className={Style.address}>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className={Style.section}>
          <div className={Style.title}>
            <h3>Review items and delivery</h3>
          </div>
          <div className={Style.items}>
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className={Style.section}>
          <div className={Style.title}>
            <h3>Payment Method</h3>
          </div>
          <div className={Style.details}>
            {/* Stripe magic will go */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className={Style.priceContainer}>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Order Total ({basket.length} items) :
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
