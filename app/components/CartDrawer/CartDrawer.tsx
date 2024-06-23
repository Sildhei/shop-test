"use client";

import { useCart } from "@/app/context";
import styles from "./CartDrawer.module.scss";
import { useMemo } from "react";
import { formatCurrency } from "@/app/helpers/formatCurrency";
import { buyProductsAction } from "@/app/helpers/actions";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const CartDrawer = () => {
  const { cartItems, setCartItems, isOpen, setIsOpen } = useCart();

  const total = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  }, [cartItems]);

  const handleOnBuy = () => {
    buyProductsAction(cartItems);
    setCartItems([]);
    setIsOpen(false);
    localStorage.clear();
  };

  const handleOnEmptyCart = () => {
    setCartItems([]);
    setIsOpen(false);
    localStorage.clear();
  };

  return (
    <div
      className={`${styles.mainContainer} ${
        isOpen && styles.openMainContainer
      }`}
    >
      <div>
        <div className={styles.topContainer}>
          <h3>Shopping Cart</h3>
          <div className={styles.iconWrapper} onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </div>
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.productWrapper}>
            <div className={styles.productWrapper}>
              <p>{item.name}</p>
              <p>x{item.amount}</p>
            </div>
            <p>{formatCurrency(item.price * item.amount)}</p>
          </div>
        ))}
      </div>
      <div>
        <div className={styles.totalWrapper}>
          <p>Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
        <div className={styles.buttonsWrapper}>
          <button onClick={handleOnBuy}>Buy</button>
          <button onClick={() => handleOnEmptyCart()}>Empty Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
