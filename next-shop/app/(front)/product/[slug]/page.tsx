"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/contexts/CartContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../my-page/FirebaseAppConfig";
import AddReview from "@/app/components/review/AddReview";
import ShowReviews from "@/app/components/review/ShowReviews";
const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("slug", "==", params.slug)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setProduct(doc.data());
          //   console.log(doc.id);
        });
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (!product) {
    return (
      <div>
        <p>Loading...</p>
        <Link href="/">Back to Products</Link>
      </div>
    );
  }
  return (
    <div>
      {/* <div className="my-2 text-xl">
        <Link href="/">Back to Product</Link>
      </div> */}
      <div className="grid md:grid-cols-3 md:gap-10 m-4">
        <div className="md:col-span-1">
          <img
            alt={product.name}
            src={product.image}
            width={400}
            height={200}
            // style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl mt-4">{product?.name ?? "no name"}</h1>
            </li>
            <div className="divider"></div>

            <li>{product.desc}</li>
          </ul>
        </div>
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <div className="mb-2 ">
              <div>USD {product.price} </div>
              <div>
                {product.countInStock > 0
                  ? `${product.countInStock} stock available`
                  : "no stock"}
              </div>
            </div>
            <div className="mb-2 flex justify-between">
              <button
                className="btn btn-primary w-full"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>{" "}
        </div>{" "}
        <ShowReviews slug={params.slug} /> <AddReview slug={params.slug} />
      </div>
    </div>
  );
};

export default ProductDetails;
