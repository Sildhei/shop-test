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

export async function POST(request: NextRequest) {
  const product = (await request.json()) as InputsProps;

  products.forEach((item) => {
    const itemInStock = item.name.toLowerCase() === product.name.toLowerCase();
    if (itemInStock) {
      item.amount += product.amount;
      item.price = product.price
    }
  });

  if (
    !products.find(
      (item) => item.name.toLowerCase() === product.name.toLowerCase()
    )
  ) {
    return products.push({ ...product, id: products.length + 1 });
  }

  return Response.json({ message: "success" });
}
