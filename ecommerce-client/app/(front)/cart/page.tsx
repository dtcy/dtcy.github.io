"use client";
import { useCart } from "@/app/contexts/CartContext";

const CartPage = () => {
  const { cart } = useCart();
  console.log(Object.keys(cart));
  return (
    <div>
      {Object.keys(cart).length > 0 ? (
        <div>
          {Object.keys(cart).map((key) => (
            <div key={key}>
              <span>{key}</span>:<span>{cart[key].length}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
      <p>
        Total items:{" "}
        {cart
          ? Object.values(cart).reduce(
              (acc, category) => acc + category.length,
              0
            )
          : 0}
      </p>

      <div>
        <button onClick={onClickPayment}>Check out</button>
      </div>
    </div>
  );
};

export default CartPage;
