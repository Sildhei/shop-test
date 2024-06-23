"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "../commons/Container/Container";
import styles from "./Navbar.module.scss";
import { useCart } from "@/app/context";

const Navbar = () => {
  const { setIsOpen, cartItems } = useCart();

  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.flexContainer}>
          <Link href="/">
            <div className={styles.logoContainer}>
              <Image
                src="/logo.svg"
                width={50}
                height={50}
                alt="Shop"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <p>Shop Test</p>
            </div>
          </Link>
          <ul className={styles.prueba}>
            <li>
              <Link href="/products">Products List</Link>
            </li>
            <li>
              <Link href="/add-product">Add New Product</Link>
            </li>
            <li>
              <div
                className={styles.shoppingCart}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <div
                  className={`${styles.productsBadge} ${
                    cartItems.length > 0 && styles.visibleProductsBadge
                  }`}
                >
                  <p data-testid="products-badge">{cartItems.length}</p>
                </div>
                <Image
                  src="/shopping-cart.svg"
                  width={30}
                  height={30}
                  alt="Shop"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
