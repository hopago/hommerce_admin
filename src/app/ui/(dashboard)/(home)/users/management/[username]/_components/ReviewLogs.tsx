import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/app/lib/getQueryClient";
import { daysToMs } from "../../../../utils/daysToMs";
import { fetchUserReviews } from "../services/fetchUserReviews";

import { useHandleError } from "../hooks/use-handle-error";
import { useScrollRef } from "../../../../hooks/use-scroll-ref";
import useCreatorPagination from "../../../../hooks/use-pagination";
import { creatorFilterReviews } from "@/app/store/use-filter";

import { DataTableSkeleton } from "../../../../books/_components/BooksSearchResults";
import FilterReviewLogs from "./FilterReviewLogs";
import ReviewLogTable from "./ReviewLogTable";
import PaginateControl from "../../../../_components/PaginateControl";
import { NoContent } from "./NoContentTable";

import { useEffect, useState } from "react";

export default function ReviewLogs({ userId }: { userId: string }) {
  const { filter, searchTerm, sort, enabled, setEnabled } =
    creatorFilterReviews();
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
  } = useQuery<ReviewData>({
    queryKey: [QueryKeys.USER_REVIEW, currentPage],
    queryFn: () =>
      fetchUserReviews({
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

  useHandleError({ error, isError, fieldName: "리뷰" });

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

  if (isSuccess && !data?.reviews?.length)
    return (
      <NoContent
        queryKey={[QueryKeys.USER_REVIEW, userId]}
        refetch={refetch}
        error={error}
        isRefetching={isRefetching}
        isRefetchError={isRefetchError}
        fieldName="리뷰"
      />
    );

  if (isSuccess && data?.reviews?.length) {
    return (
      <div ref={scrollRef}>
        <FilterReviewLogs />
        <ReviewLogTable
          userId={userId}
          isLoading={isLoading}
          reviews={data.reviews as ReviewLogs}
          dataLength={data?.pagination.totalReviews}
          currentPage={currentPage}
        />
        <PaginateControl
          pageTotal={data?.pagination?.totalPages}
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
