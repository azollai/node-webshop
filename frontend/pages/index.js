import Head from "next/head";
import { useRouter } from "next/navigation";

export async function getServerSideProps(context) {
  const productsResponse = await fetch("http://localhost:3030/api/v1/products");
  const products = await productsResponse.json();

  const basketItemsResponse = await fetch(
    "http://localhost:3030/api/v1/basket-items"
  );
  const basketItems = await basketItemsResponse.json();

  return {
    props: { products, basketItems },
  };
}

export default function Home({ products, basketItems }) {
  const router = useRouter();

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
    router.refresh();
  }

  async function deleteBasketItem(id) {
    await fetch(`http://localhost:3030/api/v1/basket-items/${id}`, {
      method: "DELETE",
    });
    router.refresh();
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
    </div>
  );
}
