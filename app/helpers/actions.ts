"use server";

import { revalidateTag } from "next/cache";
import { InputsProps } from "../components/AddNewProductForm/AddNewProductForm";
import { ProductProps } from "../api/products/route";

export async function addNewProductAction(product: InputsProps) {
  await fetch(`${process.env.BASE_URL}/api/products`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Typpe": "application/json",
    },
  });
  revalidateTag("products");
}

export async function buyProductsAction(itemsInCart: ProductProps[]) {
  await fetch(`${process.env.BASE_URL}/api/products`, {
    method: "PATCH",
    body: JSON.stringify(itemsInCart),
    headers: {
      "Content-Typpe": "application/json",
    },
  });
  revalidateTag("products");
}
