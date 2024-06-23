import { ProductProps } from "../api/products/route";
import Container from "../components/commons/Container/Container";
import ProductCard from "../components/Products/ProductCard";
import styles from "./Products.module.scss";

const getAllProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
      next: { tags: ["products"] },
    });
    return res.json();
  } catch (error) {
    console.log("error", error);
  }
};

export default async function ProductsPage() {
  const res = await getAllProducts();

  return (
    <div className={styles.mainContainer}>
      <Container>
        <h3>Products</h3>
        <div className={styles.productsContainer}>
          {res.data.map((product: ProductProps) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </Container>
    </div>
  );
}
