import { Suspense } from "react";

import { PointRowAsync } from "./PointRow";

import styles from "./review-log-list.module.css";

import { TableSkeleton } from "../../../../books/_components/BookTable";

type PointLogTableProps = {
  pointLogs: PointLogs;
  isLoading: boolean;
  userId: string;
  currentPage: number;
};

export default function PointLogTable({
  pointLogs,
  isLoading,
  userId,
  currentPage,
}: PointLogTableProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <table>
          <thead>
            <tr>
              <td>일자</td>
              <td>사유</td>
              <td>증감</td>
            </tr>
          </thead>
          <tbody>
            {pointLogs.map((point) => (
              <Suspense key={point._id} fallback={<TableSkeleton />}>
                <PointRowAsync
                  point={point}
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
