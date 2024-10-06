import { IoIosStar } from "react-icons/io";
import { IoStarHalfSharp } from "react-icons/io5";
import { MdOutlineStarOutline } from "react-icons/md";

function AverageRating({ rating }: { rating: number }) {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    return (
      <span key={index}>
        {rating >= starValue ? (
          <IoIosStar className="text-primary2" />
        ) : rating >= starValue - 0.5 ? (
          <IoStarHalfSharp className="text-primary2" />
        ) : (
          <MdOutlineStarOutline className="text-primary2" />
        )}
      </span>
    );
  });
  return <i className="mt-3 text-2xl flex">{ratingStar}</i>;
}

export default AverageRating;
