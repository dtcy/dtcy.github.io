"use client";
import StarRating from "@/app/components/rate/Rate";
import { useProduct } from "@/app/contexts/ProductContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/(front)/my-page/FirebaseAppConfig";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "@/app/(front)/my-page/FirebaseAppConfig";
import Rate from "../rate/Rate";
import { useAuth } from "@/app/contexts/AuthContext";
function AddReview({ slug }) {
  const {
    setReviews,
    rate,
    reviewTitle,
    reviewContent,
    setRate,
    setReviewTitle,
    setReviewContent,
  } = useProduct();
  const { userState } = useAuth();

  const handleReviewSubmit = async () => {
    try {
      if (userState) {
        const user = auth.currentUser;
        const userId = user?.uid;

        const reviewData = {
          title: reviewTitle,
          content: reviewContent,
          rate,
          userId: userId,
          createdAt: serverTimestamp(),
        };

        const q = query(collection(db, "products"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          const productId = doc.id;
          await addDoc(
            collection(db, "products", productId, "reviews"),
            reviewData
          );
          setReviews((prevReviews) => [...prevReviews, reviewData]);
          setReviewTitle("");
          setReviewContent("");
          setRate(0);
        });
      } else {
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3>Add a Review</h3>
        <div className="">
          <label htmlFor="reviewTitle">Title:</label>
          <input
            id="reviewTitle"
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        </div>
        <div className=" ">
          <label htmlFor="reviewContent">Content:</label>

          <input
            id="reviewContent"
            type="text"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="rate">
            Rate:
            <Rate noOfStar={5} />
          </label>
          <button className="btn btn-secondary" onClick={handleReviewSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddReview;
