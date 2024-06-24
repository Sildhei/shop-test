import { InputsProps } from "@/app/components/AddNewProductForm/AddNewProductForm";
import { products } from "@/app/data/products";
import { NextRequest } from "next/server";

export interface ProductProps {
  name: string;
  price: number;
  amount: number;
  id: number;
}

export async function GET() {
  return Response.json({ data: products });
}

export async function POST(request: NextRequest) {
  const product = (await request.json()) as InputsProps;

  const existingProduct = products.find(
    (item) => item.name.toLowerCase() === product.name.toLowerCase()
  );

  if (existingProduct) {
    existingProduct.amount += product.amount;
    existingProduct.price = product.price;
  } else {
    products.push({ ...product, id: products.length + 1 });
  }

  return Response.json({ message: "Product added" });
}

export async function PATCH(request: NextRequest) {
  const shoppingCart = (await request.json()) as ProductProps[];

  products.forEach((product) => {
    const itemInCart = shoppingCart.find((item) => item.id === product.id);
    if (itemInCart) {
      product.amount -= itemInCart.amount;
    }
  });

  return Response.json({ message: "success" });
}
