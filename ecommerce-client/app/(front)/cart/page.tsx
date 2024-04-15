"use client";
import { useCart } from "@/app/contexts/CartContext";

const CartPage = () => {
  const { cart } = useCart();
  console.log(Object.keys(cart));

  return (
    <div>
      {Object.keys(cart).length > 0 ? (
        <div>
          {Object.entries(cart).map(([key, items]) => (
            <div key={key}>
              <span>{key}</span>:
              <span>{Array.isArray(items) ? items.length : ""}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
      <p>
        Total items:{" "}
        {cart &&
          Object.values(cart).reduce(
            (acc, category) =>
              Array.isArray(category) ? acc + category.length : acc,
            0
          )}
      </p>

      <div>
        <button>Check out</button>
      </div>
    </div>
  );
};

export default CartPage;
