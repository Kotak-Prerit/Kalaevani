import React from "react";
import ReactStars from "react-stars";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "#333",
    activeColor: "#fff",
    value: review.rating,
    isHalf: true,
    size: 25,
  };

  const createdAt = new Date(review.reviewedAt);
  const formattedDate = createdAt.toLocaleDateString("en-GB");

  return (
    <div className="flex flex-col w-[99%] p-[2vmax] px-4 my-2 text-white border-b border-gray-300 poppins md:w-full">
      <div className="flex items-start justify-start">
        <div className="w-full text-left">
          <div className="flex justify-between reviewNameDate">
            <p className="uppercase font-semibold text-[23px] montserrat">
              {review.name}
            </p>
            <p className="Apercu">{formattedDate}</p>
          </div>
          <div className="flex items-center justify-start gap-1 ratingStars">
            <ReactStars {...options} />
            <span>{review.rating} stars</span>
          </div>
        </div>
      </div>
      {review.comment && review.comment !== "" && (
        <span className="mt-4 text-left text-[16px]">
          <span className="text-gray-500">Feedback:</span> {review.comment}
        </span>
      )}
    </div>
  );
};

export default ReviewCard;
