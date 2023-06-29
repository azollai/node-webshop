export default function Counter({ id, quantity, plus, minus }) {
  return (
    <div className="flex items-center">
      <button
        className={`hover:bg-gray-200 text-gray-800 p-2 rounded inline-flex items-center transition-all duration-500`}
        onClick={() => minus(id)}
      >
        <img src="minus.svg" width={12} />
      </button>

      <div className="px-4">{quantity}</div>

      <button
        className={`hover:bg-gray-200 text-gray-800 p-2 rounded inline-flex items-center transition-all duration-500`}
        onClick={() => plus(id)}
      >
        <img src="plus.svg" width={12} />
      </button>
    </div>
  );
}
