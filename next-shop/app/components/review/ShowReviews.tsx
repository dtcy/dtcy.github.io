"use client";
import React, { useEffect } from "react";
import { useProduct } from "@/app/contexts/ProductContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/(front)/my-page/FirebaseAppConfig";
import ShowRate from "../rate/ShowRate";
function ShowReviews({ slug }) {
  const { reviews, setReviews } = useProduct();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "products"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          const reviewsCollection = collection(doc.ref, "reviews");
          const reviewsSnapshot = await getDocs(reviewsCollection);
          const fetchedReviews = [];
          reviewsSnapshot.forEach((reviewDoc) => {
            fetchedReviews.push({ id: reviewDoc.id, ...reviewDoc.data() });
          });

          setReviews(fetchedReviews);
        });
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, []);
  return (
    <div className="m-4">
      {/* <h2>Reviews</h2> */}

      {reviews.map((review) => (
        <div
          key={review.id}
          className="card border border-solid border-gray-300 mb-1"
        >
          <div className="card-body border-1">
            <ShowRate rate={review.rate} />{" "}
            <h3 className="font-bold">{review.title}</h3>
            <p>{review.content}</p>
            <p></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowReviews;
