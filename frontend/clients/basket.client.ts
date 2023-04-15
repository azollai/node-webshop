export async function getBasketItems() {
  const basketItemsResponse = await fetch(
    "http://localhost:3030/api/v1/basket-items"
  );
  const basketItems = await basketItemsResponse.json();
  return basketItems;
}

export async function createBasketItem(id) {
  await fetch(`http://localhost:3030/api/v1/products/${id}/basket-items`, {
    method: "POST",
  });
}

export async function deleteBasketItem(id) {
  await fetch(`http://localhost:3030/api/v1/basket-items/${id}`, {
    method: "DELETE",
  });
}