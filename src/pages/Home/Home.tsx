import Header from "../../components/Header/Header";
import { Products } from "../../components/Products/Products";
import { Footer } from "../../components/Footer/Footer";
import styles from "./home.module.scss";

export function Home() {
  return (
    <>
      <Header />
      {
        //<Banner />
      }
      <div className={styles.Container}>
        <div className={styles.Content}>
          <Products  />
        </div>
      </div>

      <Footer />
    </>
  );
}
