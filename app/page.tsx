import Container from "./components/commons/Container/Container";
import styles from "./page.module.scss";
import LinkButton from "./components/commons/LinkButton/LinkButton";

export default function Home() {
  return (
    <main>
      <div className={styles.mainContainer}>
        <Container>
          <div className={styles.titleContainer}>
            <h1>Welcome to the Shop - Test</h1>
            <div className={styles.buttonsContainer}>
              <LinkButton text='Go to the logic test' href='/logic-test'/>
              <LinkButton text='Go to the products test' href='/products'/>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
