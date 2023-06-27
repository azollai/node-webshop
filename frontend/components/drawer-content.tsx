import Counter from "./counter";

export default function DrawerContent({ basketItems, plus, minus }) {
  const basketItemsHtmls = basketItems.map((basketItem, index) => {
    return (
      <div key={index} className="flex justify-between align-center my-2">
        <div>
          <div>{basketItem.product.name}</div>
          <div className="text-sm">{basketItem.product.price} kr. </div>
        </div>

        <Counter
          id={basketItem._id}
          quantity={basketItem.quantity}
          plus={plus}
          minus={minus}
        />
      </div>
    );
  });

  return <div className="px-4">{basketItemsHtmls}</div>;
}
