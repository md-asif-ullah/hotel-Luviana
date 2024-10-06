import { ReviewTypes } from "@/types";
import AverageRating from "../AverageRating";
import { formateData } from "@/lib/utils";

function ShowReviews({ reviews }: { reviews: ReviewTypes[] }) {
  const totalReviews = reviews.length;

  const maxPossibleRating = totalReviews * 5;

  const totalComfortRating = reviews.reduce(
    (acc, curr) => acc + curr.comfort_rating,
    0
  );
  const totalLocationRating = reviews.reduce(
    (acc, curr) => acc + curr.location_rating,
    0
  );
  const totalServiceRating = reviews.reduce(
    (acc, curr) => acc + curr.service_rating,
    0
  );
  const totalStaffRating = reviews.reduce(
    (acc, curr) => acc + curr.staff_rating,
    0
  );

  const ratingBreakdown = [
    {
      label: "Comfort",
      percentage: (totalComfortRating / maxPossibleRating) * 100,
      rating: totalComfortRating,
    },
    {
      label: "Location",
      percentage: (totalLocationRating / maxPossibleRating) * 100,
      rating: totalLocationRating,
    },
    {
      label: "Service",
      percentage: (totalServiceRating / maxPossibleRating) * 100,
      rating: totalServiceRating,
    },
    {
      label: "Staff",
      percentage: (totalStaffRating / maxPossibleRating) * 100,
      rating: totalStaffRating,
    },
  ];

  const averageRating =
    (totalComfortRating +
      totalLocationRating +
      totalServiceRating +
      totalStaffRating) /
    (totalReviews * 4);

  return (
    <section className="mt-20">
      <div className="bg-white">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Guest Reviews
        </h2>
        <div className="space-y-2 flex space-x-1">
          <p className="text-4xl font-semibold text-primary2">
            {averageRating.toFixed(1)}
            <span className="text-2xl text-gray-500">/5</span>
          </p>
          <p className="text-slate-600 text-lg"> ({reviews.length} reviews)</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-700 mb-6">Categories:</h2>
        <div className="grid grid-cols-2 gap-6">
          {ratingBreakdown.map((item, index) => (
            <div key={index} className="w-4/5">
              <div className="flex justify-between">
                <h2 className="text-sm font-medium text-slate-600 mr-2">
                  {item.label}
                </h2>
                <p>{(item.rating / totalReviews).toFixed(1)}</p>
              </div>

              <div className="flex items-center">
                <div className="bg-gray-300 w-full h-2 rounded-full relative overflow-hidden">
                  <div
                    className="bg-[#0a2370] h-full absolute top-0 left-0"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consumer Reviews */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-slate-700">Room Reviews:</h2>

        {reviews.map((review, index) => {
          const individualRating =
            (review.comfort_rating +
              review.location_rating +
              review.service_rating +
              review.staff_rating) /
            4;

          const formateCreateData = formateData(review.createdAt);

          return (
            <div
              key={index}
              className="bg-white p-6 border-b border-gray-300 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-300 w-12 h-12 rounded-full"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formateCreateData || "N/A"}
                  </p>
                </div>
              </div>

              <h1 className="text-xl font-bold">
                <AverageRating rating={individualRating} />
              </h1>
              <p className="mt-4 text-gray-700 text-base">{review.comment}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ShowReviews;
