"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./(front)/my-page/FirebaseAppConfig";
import ProductItem from "./components/product/ProductItem";
import ContactUs from "./components/Contactus/ContactUs";
function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = [];
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
      <section
        className="hero bg-cover bg-center h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1581182800629-7d90925ad072?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <h1 className="text-white text-4xl font-bold mb-4 m-2 inline-block text-left ml-5">
          Sell your chosen korean skin care product anywhere!
        </h1>

        <button className="btn btn-primary">
          <h2 className="text-white">Contact us</h2>
        </button>
      </section>
      <section>
        <ContactUs />
      </section>
      {/* <h2>Products</h2> */}
      {/* <div className="grid grid-col-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        {products
          ? products.map((product) => (
              <ProductItem key={product.name} product={product} />
            ))
          : "no products"}
      </div> */}
    </>
  );
}

export default ProductPage;
