"use client";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../my-page/FirebaseAppConfig";
import { useAuth } from "@/app/contexts/AuthContext";

function Page() {
  const [productName, setProductName] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productBrand, setProductBrand] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCountInStock, setProductCountInStock] = useState(0);

  const registerProduct = async () => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: productName,
        slug: productSlug,
        category: productCategory,
        image: productImage,
        price: productPrice,
        brand: productBrand,
        desc: productDesc,
        countInStock: productCountInStock,
      });
      console.log("Product written with ID: ", docRef.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="card bg-base-300 shadow-xl mb-4 mt-4 ml-4">
        <h2 className="font-bold m-5">Register Product</h2>
        <div className="m-5">
          <label htmlFor="">Product Name</label> <hr />
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{ padding: ".4rem", borderRadius: "5px" }}
          />
        </div>
        <div className="m-5">
          <label htmlFor="">Product Slug</label> <hr />
          <input
            style={{ padding: ".4rem", borderRadius: "5px" }}
            type="text"
            placeholder="Product Slug"
            value={productSlug}
            onChange={(e) => setProductSlug(e.target.value)}
          />
        </div>
        <div className="m-5">
          <label htmlFor="">Product Category</label> <hr />
          <input
            style={{ padding: ".4rem", borderRadius: "5px" }}
            type="text"
            placeholder="Product Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </div>
        <div className="m-5">
          <label htmlFor="">Product Image URL</label> <hr />
          <input
            style={{ padding: ".4rem", borderRadius: "5px" }}
            type="text"
            placeholder="Product Image"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
        </div>
        <div className="m-5">
          <label htmlFor="">price</label> <hr />
          <input
            style={{ padding: ".4rem", borderRadius: "5px" }}
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(parseFloat(e.target.value))}
          />
        </div>
        <div className="m-5">
          <label htmlFor="">Product Brand</label> <hr />
          <input
            style={{ padding: ".4rem", borderRadius: "5px" }}
            type="text"
            placeholder="Product Brand"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          />
        </div>
        <div className="m-5">
          <label htmlFor="">Product Description</label> <hr />
          <input
            style={{ padding: ".4rem", borderRadius: "5px" }}
            type="text"
            placeholder="Product Description"
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
          />
        </div>
        <div className="m-5">
          <label htmlFor="">count in stock</label> <hr />
          <input
            style={{ padding: ".4rem", borderRadius: "5px" }}
            type="number"
            placeholder="Product Count In Stock"
            value={productCountInStock}
            onChange={(e) => setProductCountInStock(parseInt(e.target.value))}
          />
        </div>

        <button className="btn btn-primary m-5" onClick={registerProduct}>
          Register
        </button>
      </div>
    </>
  );
}

export default Page;
