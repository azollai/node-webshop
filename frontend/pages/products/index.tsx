import { createBasketItem } from "clients/basket.client";
import { getProducts } from "clients/product.client";
import {
  BasketItem,
  deleteBasketItem,
  getBasketItems,
} from "clients/basket.client";
import DrawerContent from "components/drawer-content";
import ProductCard from "components/product-card";
import Head from "next/head";
import { useState, useEffect } from "react";
import Drawer from "components/drawer";
import Counter from "components/counter";

export async function getServerSideProps() {
  const _products = await getProducts();
  const _basketItems = await getBasketItems();

  return {
    props: { _products, _basketItems },
  };
}

export default function Home({ _products, _basketItems }) {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  useEffect(() => {
    setProducts(_products);
  }, [_products]);

  useEffect(() => {
    setBasketItems(_basketItems);
  }, [_basketItems]);

  async function addBasketItem(id) {
    await createBasketItem(id);
    await updatePage();
  }

  async function removeBasketItem(id) {
    await deleteBasketItem(id);
    await updatePage();
  }

  async function updatePage() {
    setBasketItems(await getBasketItems());
    setProducts(await getProducts());
  }

  const productHtmls = products.map((product, index) => (
    <div key={index}>
      <ProductCard product={product} click={addBasketItem}>
        {product.basketItems.length ? (
          <Counter
            id={product.basketItems[0]._id}
            quantity={product.basketItems[0].quantity}
            plus={addBasketItem}
            minus={removeBasketItem}
          />
        ) : null}
      </ProductCard>
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

        <Drawer>
          <DrawerContent
            basketItems={basketItems}
            plus={addBasketItem}
            minus={removeBasketItem}
          />
        </Drawer>
      </div>

      <div className="flex">{productHtmls}</div>
    </div>
  );
}
