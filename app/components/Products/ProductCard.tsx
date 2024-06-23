"use client";

import { ProductProps } from "@/app/api/products/route";
import styles from "./ProductCard.module.scss";
import Image from "next/image";
import { useCart } from "@/app/context";
import { useMemo } from "react";
import { formatCurrency } from "@/app/helpers/formatCurrency";
import { useForm, SubmitHandler } from "react-hook-form";

const ProductCard = ({ product }: { product: ProductProps }) => {
  const { addProductToCart, cartItems } = useCart();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ qty: number }>();

  const maxItemQty = useMemo(() => {
    const inCart = cartItems?.find((item) => item.name === product.name);

    if (inCart) {
      return product.amount - inCart.amount;
    } else {
      return product.amount;
    }
  }, [product, cartItems]);

  const onSubmit: SubmitHandler<{ qty: number }> = (data) => {
    addProductToCart({ ...product, amount: data.qty });
    reset();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <Image
          src="/products-image.jpg"
          alt="Product"
          fill
          objectFit="cover"
          style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <h4>{product.name}</h4>
          <div className={styles.dataWrapper}>
            <p className={`${product.amount === 0 && styles.noQty}`}>
              {product.amount} in stock
            </p>
            <p>{formatCurrency(product.price)}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.buttonWrapper}>
            <button
              type="submit"
              disabled={product.amount === 0}
              className={`${product.amount === 0 && styles.disabled} `}
            >
              Add to cart
            </button>
            <div className={styles.inputContainer}>
              <input
                disabled={product.amount === 0}
                className={`${product.amount === 0 && styles.disabled} `}
                placeholder="0"
                id="quantity"
                type="number"
                {...register("qty", {
                  required: "You must enter a valid quantity",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "The quantity must be at least 1",
                  },
                  max: {
                    value: maxItemQty,
                    message: "You excedeed the items in stock",
                  },
                })}
              />
              {errors.qty && <span>{errors.qty.message}</span>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCard;
