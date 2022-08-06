import Header from "../../components/Header/Header";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

import styles from "./cart.module.scss";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { toast } from "react-toastify";
import { Link} from "react-router-dom";
import jsPDF from "jspdf";
import { Footer } from "../../components/Footer/Footer";
import { Key } from "phosphor-react";
import { useEffect, useState } from "react";


interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

export function Cart() {
  const { cart, removeProduct, updateProductAmount } = useCart();
  const [user, setUser] = useState("");

  //const cartFornatted com chave key
  
  const cartFormatted = cart.map((product) => ({
    ...product,    
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));
  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.price * product.amount;
    }, 0)
  );

  function handleProductIncrement(product: Product) {
    updateProductAmount({
      productId: product.id,
      amount: product.amount + 1,
    });
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({
      productId: product.id,
      amount: product.amount - 1,
    });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  const hendleCreatePdf = () => {
    const userNamePrint = JSON.parse(localStorage.getItem("userName")!);
    const userEmail = JSON.parse(localStorage.getItem("userEmail")!);

    if (localStorage.getItem("user")) {
      let doc = new jsPDF("portrait", "pt");

      doc.setFontSize(16);
      doc.addFont("Courier", "Courier", "normal");
      doc.setFont("Courier");
      doc.setTextColor(0, 0, 0);
      doc.text("FASTFRUIT - Relatório de Compra:", 40, 40);
      doc.setFontSize(12);
      doc.text(
        `-------------------------------------------------------------------------`,
        40,
        80
      );
      doc.text(`Cliente: ${userNamePrint} - E-mail${userEmail}`, 40, 100);
      doc.text(`Data da compra: ${new Date().toLocaleDateString()}`, 40, 120);
      doc.text(
        `-------------------------------------------------------------------------`,
        40,
        140
      );
      doc.text("Itens da compra", 40, 160);
      doc.text(
        cartFormatted.map((product) => {
          return(
            `${product.title} - ${product.priceFormatted} - ${product.amount} - ${product.subTotal}`
          )
        }),
        40,
        190
      );
      doc.text(
        `-------------------------------------------------------------------------`,
        40,
        450
      );
      doc.text("Valor Total da Compra: R$ " + total, 40, 470);
      doc.text(
        `-------------------------------------------------------------------------`,
        40,
        490
      );
      doc.text("Obrigado por comprar conosco!", 40, 510);

      doc.save("Comprovante.pdf");

      return;
    } else {
      toast.error("Para gerar o comprovante, você precisa fazer login na loja");
    }
  };

  // update user name com useState do localStorage

  const handleUserName = localStorage.getItem("userName")!;

  return (
    <>
      <Header />
      <div className={styles.Container}>
        <div className={styles.Content}>
          <header>
            <Link to={"/"} className={styles.BtnVoltar}>
              Volta loja
            </Link>
            <p>
              Cliente: <span>{handleUserName ? <span>{handleUserName}, cliquem em finalizar para gerar seu comprovatnte</span> : "não logado, faça login para continuar"}</span>
            </p>
            <h2>Meu Carrinho de compras</h2>
          </header>
          <main>
            <div className={styles.cabecalho}>
              <h3 className={styles.produto}>Produtos</h3>
              <h3 className={styles.quantidade}>Quantidade</h3>
              <h3 className={styles.subtotaldisplay}>Subtotal</h3>
            </div>
            <ul >
              {cartFormatted.map((product) => (
                <>
                  <li key={product.id} className={styles.listaProdutos}>
                    <div className={styles.imgProduct}>
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className={styles.description}>
                      <h4>{product.title}</h4>
                      <p>{product.priceFormatted}</p>
                    </div>
                    <div className={styles.update}>
                      <button
                        className={styles.btnIncrementDecrement}
                        type="button"
                        data-testid="decrement-product"
                        disabled={product.amount <= 1}
                        onClick={() => handleProductDecrement(product)}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={product.amount}
                      />
                      <button
                        className={styles.btnIncrementDecrement}
                        type="button"
                        data-testid="increment-product"
                        onClick={() => handleProductIncrement(product)}
                      >
                        <MdAddCircleOutline fill="#121214" size={20} />
                      </button>
                    </div>

                    <div className={styles.subtotal}>
                      <p>{product.subTotal}</p>
                    </div>

                    <div className={styles.remove}>
                      <button
                        type="button"
                        data-testid="remove-product"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <MdDelete size={25} />
                      </button>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </main>
          <footer>
            <div>
              <button className={styles.buttonFooter} type="button" onClick={hendleCreatePdf}>
                finalizar compra
              </button>
              <h3>Total: {total}</h3>
            </div>
          </footer>
        </div>        
      </div>
    </>
  );
}

export default Cart;
