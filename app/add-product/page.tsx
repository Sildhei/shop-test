import Container from "../components/commons/Container/Container";
import styles from "./AddProduct.module.scss";
import AddNewProductForm from "../components/AddNewProductForm/AddNewProductForm";

export default function AddProductPage() {
  return (
    <div className={styles.mainContainer}>
      <Container>
        <AddNewProductForm />
      </Container>
    </div>
  );
}
