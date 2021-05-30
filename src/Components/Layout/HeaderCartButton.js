import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnBump, setBtnBump] = useState(false);
  console.log("context connected in Header Cart Button");
  console.log("Items inside Header cart button", cartCtx.items);
  const btnclasses = `${classes.button} ${btnBump ? classes.bump : ""} `;
  const { items } = cartCtx;
  const numberOfItems = cartCtx.items.reduce((currentNumber, item) => {
    console.log("item,Amount in item", item, item.amount);
    console.log("currentNumber", currentNumber);
    return currentNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnBump(true);
    const btnTimeout = setTimeout(() => {
      setBtnBump(false);
    }, 300);
    return () => {
      clearTimeout(btnTimeout);
    };
  }, [items]);
  return (
    <button className={btnclasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
