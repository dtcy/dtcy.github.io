import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../my-page/FirebaseAppConfig";

function page({ params: groupName }) {
  const [card, setCard] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("slug", "==", params.slug)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setCard(doc.data());
          //   console.log(doc.id);
        });
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [params.groupName]);
  return <div></div>;
}

export default page;
