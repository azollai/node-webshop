import { BaseObject } from "./base-object";
import { Product } from "./product.client";

export interface BasketItem extends BaseObject {
  quantity: number;
  product: Product;
}

export async function getBasketItems(): Promise<BasketItem[]> {
  const basketItemsResponse = await fetch(
    "http://localhost:3030/api/v1/basket-items"
  );
  const basketItems = await basketItemsResponse.json();
  return basketItems;
}

export async function createBasketItem(id): Promise<void> {
  await fetch(`http://localhost:3030/api/v1/products/${id}/basket-items`, {
    method: "POST",
  });
}

export async function deleteBasketItem(id): Promise<void> {
  await fetch(`http://localhost:3030/api/v1/basket-items/${id}`, {
    method: "DELETE",
  });
}
