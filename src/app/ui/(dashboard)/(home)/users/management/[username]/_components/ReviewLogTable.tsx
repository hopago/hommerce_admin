import { Suspense } from "react";

import ReviewControlPanel from "./ReviewControlPanel";
import { ReviewRowAsync } from "./ReviewRow";
import ReviewSelectAllCheckBox from "./ReviewSelectAllCheckBox";

import styles from "./review-log-list.module.css";

import { TableSkeleton } from "../../../../books/_components/BookTable";

type ReviewLogTableProps = {
  reviews: ReviewLogs | undefined;
  dataLength: number;
  isLoading: boolean;
  userId: string;
  currentPage: number;
};

export default function ReviewLogTable({
  reviews,
  dataLength,
  isLoading,
  userId,
  currentPage,
}: ReviewLogTableProps) {
  const ids = reviews?.map((review) => review._id);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <ReviewControlPanel dataLength={dataLength} userId={userId} />
        <table>
          <thead>
            <tr>
              <ReviewSelectAllCheckBox ids={ids!} />
              <td>리뷰 ID</td>
              <td>책 제목</td>
              <td>리뷰 내용</td>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review) => (
              <Suspense key={review._id} fallback={<TableSkeleton />}>
                <ReviewRowAsync
                  review={review}
                  isLoading={isLoading}
                  userId={userId}
                  currentPage={currentPage}
                />
              </Suspense>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
