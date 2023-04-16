import { createBasketItem } from "clients/basket.client";
import { getProducts } from "clients/product.client";
import TheDrawer from "components/the-drawer";
import ProductCard from "components/product-card";
import Head from "next/head";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
  const _products = await getProducts();

  return {
    props: { _products },
  };
}

export default function Home({ _products }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(_products);
  }, [_products]);

  const productHtmls = products.map((product, index) => (
    <div key={index}>
      <ProductCard product={product} click={createBasketItem} />
    </div>
  ));

  return (
    <div className="bg-[#faf8f5]">
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold p-2">Products</h1>

        <TheDrawer/>
      </div>

      <div className="flex">{productHtmls}</div>
    </div>
  );
}
