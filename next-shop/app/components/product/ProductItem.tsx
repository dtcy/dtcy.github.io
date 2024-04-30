"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/(front)/my-page/FirebaseAppConfig";
import { Product } from "@/app/type/ProductModel";
import ShowRate from "../rate/ShowRate";

function ProductItem({ product }: { product: Product }) {
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("slug", "==", product.slug)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          const reviewsCollection = collection(doc.ref, "reviews");
          const reviewsSnapshot = await getDocs(reviewsCollection);
          const fetchedReviews = reviewsSnapshot.docs.map((reviewDoc) => ({
            id: reviewDoc.id,
            ...reviewDoc.data(),
          }));

          setReviews(fetchedReviews);
        });
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, [product.slug]);

  const handleToggleReviews = () => {
    setShowAllReviews((prevShowAllReviews) => !prevShowAllReviews);
  };

  return (
    <>
      <div className="card-container">
        <div className={`card bg-base-300 shadow-xl mb-4 mt-4 ml-4 `}>
          <Link href={`/product/${product.slug}`}>
            <img
              className="mt-5 ml-9 w-40 h-20"
              alt={product.name}
              src={product.image}
              width={300}
            />
            <div className="card-body">
              <h2 className="card-title font-normal">{product.name}</h2>
              <p className="mb-2">{product.brand}</p>
              <div className="card-actions flex items-center justify-between"></div>
              <span className="text-2xl">$ {product.price}</span>
            </div>
            <div className="reviews">
              <div className="m-4">
                {/* {reviews && <div>Reviews</div>} */}
                {showAllReviews ? (
                  reviews.map((review) => (
                    <>
                      {" "}
                      <div
                        key={review.id}
                        className="card border border-solid border-gray-300 mb-1"
                        style={{ flex: "1 0 auto" }}
                      >
                        {" "}
                        <div className="card-body border-1">
                          <h3 className="font-bold">{review.title}</h3>
                          <p>{review.content}</p>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <>
                    {reviews.slice(0, 1).map((review) => (
                      <div
                        key={review.id}
                        className="card border border-solid border-gray-300 mb-1"
                        style={{ flex: "1 0 auto" }}
                      >
                        <div className="card-body border-1">
                          <h3 className="font-bold">{review.title}</h3>
                          <p>{review.content}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Link>{" "}
          {reviews ? (
            <button onClick={handleToggleReviews} className="text-blue-500 m-2">
              {showAllReviews ? "Hide reviews" : "Show more reviews"}
            </button>
          ) : (
            ""
          )}
        </div>{" "}
      </div>
    </>
  );
}

export default ProductItem;
