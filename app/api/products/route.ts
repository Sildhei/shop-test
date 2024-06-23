import { InputsProps } from "@/app/components/AddNewProductForm/AddNewProductForm";
import { products } from "@/data/products";
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

export async function POST(request: NextRequest): Promise<void | Response> {
  const product = (await request.json()) as InputsProps;

  const existingProduct = products.find(
    (item) => item.name.toLowerCase() === product.name.toLowerCase()
  );

  if (existingProduct) {
    existingProduct.amount += product.amount;
    existingProduct.price = product.price;

    return Response.json({ message: "Product updated" });
  } else {
    products.push({ ...product, id: products.length + 1 });

    return Response.json({ message: "Product added" });
  }
}
