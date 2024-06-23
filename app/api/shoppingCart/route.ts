import { products } from "@/data/products";
import { NextRequest } from "next/server";
import { ProductProps } from "../products/route";

export async function POST(request: NextRequest) {
  const shoppingCart = (await request.json()) as ProductProps[];

  products.forEach((product) => {
    const itemInCart = shoppingCart.find((item) => item.id === product.id);
    if (itemInCart) {
        product.amount -= itemInCart.amount;
      }
  });
  return Response.json({ message: "success" });
}
