export async function getBasketItems() {
  const basketItemsResponse = await fetch(
    "http://localhost:3030/api/v1/basket-items"
  );
  const basketItems = await basketItemsResponse.json();
  return basketItems;
}
