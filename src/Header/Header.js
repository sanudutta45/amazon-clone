import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

//context value
import { useContextValue } from "../Content/contextProvider";

// material icons
import {
  Search as SearchIcon,
  ShoppingBasket as ShoppingBasketIcon,
} from "@material-ui/icons";

//css module
import Style from "./Header.module.css";

const Header = () => {
  const [{ basket, user }] = useContextValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className={Style.header}>
      <img
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        className={Style.logo}
        alt=""
      />

      <div className={Style.search}>
        <input type="text" className={Style.searchInput} />
        <div className={Style.searchIcon}>
          <SearchIcon />
        </div>
      </div>

      <div className={Style.nav}>
        <Link to={!user && "/login"}>
          <div className={Style.option} onClick={handleAuthentication}>
            <span className={Style.optionLineOne}>
              {!user ? "Guest" : user.email}
            </span>
            <span className={Style.optionLineTwo}>
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <div className={Style.option}>
          <span className={Style.optionLineOne}>Returns</span>
          <span className={Style.optionLineTwo}>& Orders</span>
        </div>

        <div className={Style.option}>
          <span className={Style.optionLineOne}>Your</span>
          <span className={Style.optionLineTwo}>Prime</span>
        </div>

        <Link to="/checkout">
          <div className={Style.optionBasket}>
            <ShoppingBasketIcon />
            <span className={`${Style.optionLineTwo} ${Style.basketCount}`}>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
