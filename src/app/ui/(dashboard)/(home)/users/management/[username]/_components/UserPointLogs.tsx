import styles from "./user-point-logs.module.css";

import { creatorFilterPoints } from "@/app/store/use-filter";
import { useScrollRef } from "../../../../hooks/use-scroll-ref";
import useCreatorPagination from "../../../../hooks/use-pagination";
import { useHandleError } from "../hooks/use-handle-error";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/app/lib/getQueryClient";
import { daysToMs } from "../../../../utils/daysToMs";
import { fetchUserPointLog } from "../services/fetchUserPointLog";

import { DataTableSkeleton } from "../../../../books/_components/BooksSearchResults";
import PaginateControl from "../../../../_components/PaginateControl";
import FilterPointLogs from "./FilterPointLogs";
import PointLogTable from "./PointLogTable";
import UserPoint from "./UserPoint";
import { NoContent } from "./NoContentTable";

import { useEffect, useState } from "react";

type UserPointLogsProps = {
  userId: string;
};

export default function UserPointLogs({ userId }: UserPointLogsProps) {
  const { sort, filter, searchTerm, enabled, setEnabled } =
    creatorFilterPoints();
  const {
    currentPage,
    handlePrevPage,
    handleNextPage,
    handleSetPage,
    handleMoveToFirstPage,
    handleMoveToLastPage,
  } = useCreatorPagination();

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
    isRefetching,
    isRefetchError,
  } = useQuery<PointData>({
    queryKey: [QueryKeys.USER_POINT_LOG, currentPage],
    queryFn: () =>
      fetchUserPointLog({
        pageNum: currentPage,
        filter,
        searchTerm,
        userId,
        sort,
      }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled,
  });

  useHandleError({ error, isError, fieldName: "포인트" });

  useEffect(() => {
    setEnabled(true);
  }, [currentPage, sort]);

  useEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [enabled]);

  useEffect(() => {
    if (isSuccess) {
      setEnabled(false);
    }
  }, [isSuccess]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const { scrollRef } = useScrollRef({ currentPage });

  if (isLoading) return <DataTableSkeleton />;

  if (isSuccess && !data?.pointsLogs?.length)
    return (
      <div className={styles.pointsLogs}>
        <NoContent
          text="포인트 기록이 아직 없네요."
          refetch={refetch}
          error={error}
          isRefetching={isRefetching}
          isRefetchError={isRefetchError}
          queryKey={[QueryKeys.USER_POINT_LOG, userId]}
          fieldName="포인트 기록"
        />
      </div>
    );

  if (isSuccess && data?.pointsLogs.length) {
    return (
      <div className={styles.pointsLogs} ref={scrollRef}>
        <h1>포인트 기록</h1>
        <UserPoint userId={userId} />
        <FilterPointLogs />
        <PointLogTable
          pointLogs={data.pointsLogs as PointLogs}
          isLoading={isLoading}
          userId={userId}
        />
        <PaginateControl
          pageTotal={data?.pagination.totalPages}
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleSetPage={handleSetPage}
          handleMoveToFirstPage={handleMoveToFirstPage}
          handleMoveToLastPage={handleMoveToLastPage}
        />
      </div>
    );
  }
}
