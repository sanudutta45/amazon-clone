import React from "react";

//css
import Style from "./CheckoutProduct.module.css";
import { useContextValue } from "../Content/contextProvider";

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
  const [, dispatch] = useContextValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className={Style.checkoutProduct}>
      <img className={Style.image} src={image} alt="" />

      <div className={Style.info}>
        <p className={Style.title}>{title}</p>
        <p className={Style.price}>
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className={Style.rating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
