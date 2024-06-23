"use server";

import { revalidateTag } from "next/cache";
import { InputsProps } from "../components/AddNewProductForm/AddNewProductForm";
import { ProductProps } from "../api/products/route";

export async function addNewProductAction(product: InputsProps) {
  await fetch("http://localhost:3000/api/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Typpe": "application/json",
    },
  });
  revalidateTag("products");
}

export async function buyProductsAction(itemsInCart: ProductProps[]) {
  await fetch("http://localhost:3000/api/shoppingCart", {
    method: "POST",
    body: JSON.stringify(itemsInCart),
    headers: {
      "Content-Typpe": "application/json",
    },
  });
  revalidateTag("products");
}
