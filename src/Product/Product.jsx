import React from "react";

//context
import { useContextValue } from "../Content/contextProvider";

//css
import Style from "./Product.module.css";

const Product = ({ id, title, image, price, rating }) => {
  const [, dispatch] = useContextValue();

  const addToBasket = () => {
    //dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className={Style.product}>
      <div className={Style.info}>
        <p>{title}</p>
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
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
