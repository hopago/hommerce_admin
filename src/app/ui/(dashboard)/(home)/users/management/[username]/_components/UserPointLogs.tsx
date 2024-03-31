import { useHandleError } from "../hooks/use-handle-error";

import PaginateControl from "../../../../_components/PaginateControl";
import FilterPointLogs from "./FilterPointLogs";
import PointLogTable from "./PointLogTable";
import UserPoint from "./UserPoint";
import { NoContent } from "./NoContentTable";

import styles from "./user-point-logs.module.css";

import { creatorFilterPoints } from "@/app/store/use-filter";
import { useCreatorPagination } from "@/app/store/use-pagination";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys, getQueryClient } from "@/app/lib/getQueryClient";
import { daysToMs } from "../../../../utils/daysToMs";
import { fetchUserPointLog } from "../services/fetchUserPointLog";

import { DataTableSkeleton } from "../../../../books/_components/BooksSearchResults";

import { useEffect } from "react";
import { useScrollRef } from "../../../../hooks/use-scroll-ref";

type UserPointLogsProps = {
  userId: string;
};

export default function UserPointLogs({ userId }: UserPointLogsProps) {
  const { sort, filter, searchTerm, enabled, setEnabled } =
    creatorFilterPoints();
  const { currentPage } = useCreatorPagination();

  const queryClient = getQueryClient();

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

  useEffect(() => {
    if (enabled) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_POINT_LOG, currentPage],
      });
      refetch();
    }
  }, [enabled, sort]);

  useEffect(() => {
    if (isSuccess) {
      setEnabled(false);
    }
  }, [isSuccess]);

  useHandleError({ error, isError, fieldName: "포인트" });

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
        <PaginateControl pageTotal={data?.pagination.totalPages!} />
      </div>
    );
  }
}
