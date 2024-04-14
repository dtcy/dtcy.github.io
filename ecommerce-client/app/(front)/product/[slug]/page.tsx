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
        <p>Product not found.</p>
        <Link href="/">Back to Products</Link>
      </div>
    );
  }
  return (
    <div>
      <div className="my-2">
        <Link href="/">Back to Product</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <img
            alt={product.name}
            src={product.image}
            width={640}
            height={640}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product?.name ?? "no name"}</h1>
            </li>
            <div className="divider"></div>

            <li>Description: {product.desc}</li>
          </ul>
        </div>
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <div className="mb-2 flex justify-between">
              <div>{product.price} USD</div>
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
            <div className="mb-2 flex justify-between">
              <AddReview slug={params.slug} />
            </div>
            <div className="mb-2 flex justify-between">
              <ShowReviews slug={params.slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
