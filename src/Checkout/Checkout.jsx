import React from "react";

//component
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

//context
import { useContextValue } from "../Content/contextProvider";

//css
import Style from "./Checkout.module.css";

const Checkout = () => {
  const [{ basket, user }] = useContextValue();

  return (
    <div className={Style.checkout}>
      <div className={Style.left}>
        <img
          className={Style.ad}
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className={Style.title}>Your Shopping Basket</h2>

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

      <div className={Style.right}>
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
