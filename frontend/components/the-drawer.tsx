import { deleteBasketItem, getBasketItems } from "clients/basket.client";
import Drawer from "./drawer";
import { useEffect, useState } from "react";

export default function TheDrawer() {
  const [basketItems, setBasketItems] = useState([]);

  async function minus(id) {
    await deleteBasketItem(id);
    await updatePage();
  }

  async function updatePage() {
    setBasketItems(await getBasketItems());
  }

  function plus() {}

  const baksetItemsHtmls = basketItems.map((basketItem, index) => {
    return (
      <div key={index} className="flex justify-between">
        <div>{basketItem.product.name}</div>

        <div className="flex items-center">
          <button
            className={`hover:bg-gray-200 text-gray-800 p-2 rounded inline-flex items-center transition-all duration-500`}
            onClick={() => minus(basketItem._id)}
          >
            <img src="minus.svg" width={12} />
          </button>

          <div className="px-4">{basketItem.quantity}</div>

          <button
            className={`hover:bg-gray-200 text-gray-800 p-2 rounded inline-flex items-center transition-all duration-500`}
            onClick={() => plus()}
          >
            <img src="plus.svg" width={12} />
          </button>
        </div>
      </div>
    );
  });

  useEffect(() => {
    getBasketItems().then((items) => setBasketItems(items));
  }, []);

  return (
    <Drawer>
      <div className="px-4">{baksetItemsHtmls}</div>
    </Drawer>
  );
}
