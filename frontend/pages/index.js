import Head from "next/head";
import { useState, useEffect } from "react";

async function getProducts() {
  const productsResponse = await fetch("http://localhost:3030/api/v1/products");
  const products = await productsResponse.json();
  return products;
}

async function getBasketItems() {
  const basketItemsResponse = await fetch(
    "http://localhost:3030/api/v1/basket-items"
  );
  const basketItems = await basketItemsResponse.json();
  return basketItems;
}

export async function getServerSideProps(context) {
  const _products = await getProducts();
  const _basketItems = await getBasketItems();

  return {
    props: { _products, _basketItems },
  };
}

export default function Home({ _products, _basketItems }) {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    setProducts(_products);
    setBasketItems(_basketItems);
  }, []);

  async function updatePage() {
    setBasketItems(await getBasketItems());
  }

  const productHtmls = products.map((product, index) => (
    <li key={index}>
      {product.name} {product.price}dkk{" "}
      <span
        onClick={() => createBasketItem(product._id)}
        style={{ cursor: "pointer" }}
      >
        +
      </span>
    </li>
  ));

  const basketItemHtmls = basketItems.map((basketItem, index) => (
    <li key={index}>
      {basketItem.product.name}: {basketItem.quantity} piece{" "}
      <span
        onClick={() => deleteBasketItem(basketItem._id)}
        style={{ cursor: "pointer" }}
      >
        X
      </span>
    </li>
  ));

  async function createBasketItem(id) {
    await fetch(`http://localhost:3030/api/v1/products/${id}/basket-items`, {
      method: "POST",
    });
    await updatePage();
  }

  async function deleteBasketItem(id) {
    await fetch(`http://localhost:3030/api/v1/basket-items/${id}`, {
      method: "DELETE",
    });
    await updatePage();
  }

  async function checkout() {
    const response = await fetch(
      `http://localhost:3030/api/v1/payments/create-checkout-session`,
      {
        method: "POST",
      }
    );
    const url = await response.json();
    console.log(url);
    window.open(url, "_blank");
  }

  return (
    <div>
      <Head>
        <title>Webshop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Products</h1>

      <ul>{productHtmls}</ul>

      <h1>Basket</h1>

      <ul>{basketItemHtmls}</ul>

      <button onClick={() => checkout()}>Checkout</button>
    </div>
  );
}
