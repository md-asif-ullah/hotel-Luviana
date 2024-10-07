"user click";

import { ReviewTypes } from "@/types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function GetUserReviews() {
  const [reviewData, setReviewData] = useState<ReviewTypes[] | null>(null);

  const fetchReview = useCallback(async () => {
    try {
      const res = await axios.get(`/api/rooms/reviews`);

      if (res.data.success) {
        setReviewData(res.data.payload);
      }
    } catch (error: any) {
      setReviewData(null);
      throw new Error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);
  return reviewData;
}

export default GetUserReviews;
