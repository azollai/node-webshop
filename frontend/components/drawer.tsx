import { useState } from "react";

export default function Drawer(props) {
  const [checked, setChecked] = useState(false);

  const drawerHtml = (
    <div className="flex">
      <input
        type="checkbox"
        id="drawer-toggle"
        className="relative sr-only peer"
        checked={checked}
      />
      <div className="fixed top-0 right-0 z-20 w-64 h-full transition-all duration-500 transform translate-x-full bg-white shadow-lg peer-checked:translate-x-0">
        <div>
          <button
            className="flex items-center hover:bg-gray-200 text-gray-800 m-1 p-1 rounded inline-flex items-center transition-all duration-500"
            onClick={() => setChecked(!checked)}
          >
            <img src="close.svg" width={18} />

            <h2 className="text-sm m-1">Luk kurven</h2>
          </button>

          {props.children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex">
      <button
        className={`hover:bg-gray-200 text-gray-800 py-2 px-4 rounded inline-flex items-center transition-all duration-500 ${
          checked ? "mr-64" : ""
        }`}
        onClick={() => setChecked(!checked)}
      >
        <img src="cart.svg" width={24} />
      </button>

      {drawerHtml}
    </div>
  );
}
