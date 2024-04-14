"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./my-page/FirebaseAppConfig";
import ProductItem from "../components/products/ProductItem";

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData: any[] = [];
        querySnapshot.forEach((doc) => {
          productsData.push(doc.data());
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {" "}
      {/* <h2>Products</h2> */}
      <div className="grid grid-col-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products
          ? products.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))
          : "no products"}
      </div>
    </>
  );
}

export default ProductPage;
