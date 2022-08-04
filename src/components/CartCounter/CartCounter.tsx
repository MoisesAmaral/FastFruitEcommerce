import { useState } from "react";

import { ShoppingCart } from "phosphor-react";
import styles from "./cartCounter.module.scss";

import { useCart } from "../../hooks/useCart";

const CartCounter = () => {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <>
      <div className={styles.Cart}>
        <ShoppingCart className={styles.Cartshop} size={38} weight="bold" />
        <span>
          <p>{cartSize}</p>
        </span>
      </div>
    </>
  );
};

export default CartCounter;
