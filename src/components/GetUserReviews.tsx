"user click";

import { ReviewTypes } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

function GetUserReviews() {
  const [reviewData, setReviewData] = useState<ReviewTypes[] | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(`/api/rooms/reviews`);

        if (res.data.success) {
          setReviewData(res.data.payload);
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchReview();
  }, []);
  return reviewData;
}

export default GetUserReviews;
