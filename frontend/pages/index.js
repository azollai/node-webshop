import Head from "next/head";

export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:3030/api/v1/products");
  const products = await response.json();
  return {
    props: { products },
  };
}

export default function Home({ products }) {
  const productHtmls = products.map((product, index) => (
    <li key={index}>{product.name} 10dkk</li>
  ));
  return (
    <div>
      <Head>
        <title>Webshop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Products</h1>

      <ul>{productHtmls}</ul>
    </div>
  );
}
