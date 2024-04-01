import React from "react";

import ReviewActions from "./ReviewActions";
import ReviewSelectedCheckBox from "./ReviewSelectedCheckBox";

import { TableRowSkeleton } from "./TableRowSkeleton";

type ReviewRowProps = {
  review: ReviewLog;
  isLoading: boolean;
  userId: string;
  currentPage: number;
};

export const ReviewRowAsync = React.lazy(() => import("./ReviewRow"));

export default function ReviewRow({
  review,
  isLoading,
  userId,
  currentPage,
}: ReviewRowProps) {
  if (isLoading) return <TableRowSkeleton />;

  return (
    <tr>
      <ReviewSelectedCheckBox id={review._id} />
      <td>{review._id}</td>
      <td>{review.bookTitle}</td>
      <td>{review.desc}</td>
      <ReviewActions
        id={review._id}
        userId={userId}
        currentPage={currentPage}
      />
    </tr>
  );
}
