import { useState, useEffect, useMemo } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { useCart } from "../../hooks/useCart";

import styles from "./products.module.scss";
import { MagnifyingGlass } from "phosphor-react";

import { InfinitySpin } from  'react-loader-spinner'

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export function Products() {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const [busca , setBusca] = useState("");

 const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[product.id] = product.amount;
    return newSumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>("/products");

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    }

    loadProducts();
  }, []);

  // função para adcionar produtos ao carrinho
  
  function handleAddProduct(id: number) {
    addProduct(id);
  }

  //filtro de produtos por busca com o uso do useMemo

  const productsFiltered = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return products.filter((product) => 
      product.title.toLowerCase().includes(lowerBusca)
    );
  }
  , [busca, products]);


// loading spinner while fetching products
  if (!products.length) {
    return <InfinitySpin/>;
  }


  return (
    <>
      <div className={styles.Container}>
      <div className={styles.Search}>
          <input
            type="text"
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Procure aqui..."
            value={busca}
          />
          <MagnifyingGlass size={25} color="var(--green-800)" />
        </div>
        <div className={styles.ContainerProducts}>  
      <div className={styles.Content}>      
        {productsFiltered.map((product) => (
          <ul key={product.id} className={styles.ProductList}>
            <li>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              <button
                type="button"
                data-testid="add-product-button"
                onClick={() => handleAddProduct(product.id)}
              >
                <div data-testid="cart-product-quantity">
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {cartItemsAmount[product.id] || 0}
                </div>
                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          </ul>
        ))}
        </div>
      </div>
      </div>
    </>
  );
}
