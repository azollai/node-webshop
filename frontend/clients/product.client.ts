import { BaseObject } from "./base-object";

export interface Product extends BaseObject {
  name: string;
  price: number;
}

export async function getProducts() {
  const productsResponse = await fetch("http://localhost:3030/api/v1/products");
  const products = await productsResponse.json();
  return products;
}
