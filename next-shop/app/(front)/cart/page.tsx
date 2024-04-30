"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCart } from "@/app/contexts/CartContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
interface CartItem {
  item: any;
  count: number;
}
const CartPage = () => {
  const { userState } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (userState) {
          const userId = userState.uid;
          const cartCollectionRef = collection(
            getFirestore(),
            "users",
            userId,
            "cart"
          );

          setLoading(true);

          const querySnapshot = await getDocs(cartCollectionRef);

          const fetchedCart = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // const cart = { id: doc.id, name: data.name };

            fetchedCart.push({
              id: doc.id,
              name: data.name,
              count: data.count,
            });
          });
          console.log(fetchedCart);
          setCart(fetchedCart);
        }
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };
    fetchCart();
  }, [userState]);

  const classifiedCart: Record<string, CartItem> = cart.reduce((acc, cur) => {
    const itemName = cur.name;

    if (!acc[itemName]) {
      acc[itemName] = {
        item: cur,
        count: 1,
      };
    } else {
      acc[itemName].count++;
    }

    return acc;
  }, {});
  const totalItemCount: number = Object.values(classifiedCart).reduce(
    (acc: number, { count }: { count: number }) => acc + count,
    0
  );
  const handleDeleteItem = async (itemId: string) => {
    try {
      const userId = userState.uid;
      const cartDocRef = doc(getFirestore(), "users", userId, "cart", itemId);
      await deleteDoc(cartDocRef);
      console.log(cart);
      setCart((prevCart) => prevCart.filter((item) => item.id === itemId));
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };
  return (
    <>
      <div className="card bg-base-300 shadow-xl mb-4 mt-4 ml-4">
        <div className="card-body">
          {Object.keys(classifiedCart).map((itemName) => (
            <div className="card bg-base-300 shadow-xl m-1 p-5" key={itemName}>
              <span>{itemName}</span>
              <span>x {classifiedCart[itemName].count}</span>
              {/* <button onClick={() => handleDeleteItem(itemName)}>Delete</button> */}
            </div>
          ))}
          <div>total: {totalItemCount}</div>
          <button className="btn btn-primary">Check out</button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
