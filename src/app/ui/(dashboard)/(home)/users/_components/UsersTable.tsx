"use client";

import styles from "./users-table.module.css";

import { useCreatorPagination } from "@/app/store/use-pagination";
import { PaginatedUserResponse } from "../../types/user";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/app/lib/getQueryClient";
import { getUsers } from "../services/getUsers";
import { daysToMs } from "../../utils/daysToMs";
import { useHandleError } from "../management/[username]/hooks/use-handle-error";

import UsersTableItem from "./UsersTableItem";
import PaginateControl from "../../_components/PaginateControl";
import { DataTableSkeleton } from "../../books/_components/BooksSearchResults";
import { NoContent } from "../management/[username]/_components/NoContentTable";

export default function UsersTable() {
  const { currentPage } = useCreatorPagination();

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
    isRefetching,
    isRefetchError,
  } = useQuery<PaginatedUserResponse | undefined>({
    queryKey: [QueryKeys.USERS, currentPage],
    queryFn: () => getUsers(currentPage),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
  });

  useHandleError({ error, isError, fieldName: "회원 정보" });

  if (isLoading) return <DataTableSkeleton />;

  if (isSuccess && !data?.users.length)
    return (
      <div className={styles.pointsLogs}>
        <NoContent
          text="포인트 기록이 아직 없네요."
          refetch={refetch}
          error={error}
          isRefetching={isRefetching}
          isRefetchError={isRefetchError}
          queryKey={[QueryKeys.USERS, currentPage]}
          fieldName="포인트 기록"
        />
      </div>
    );

  if (isSuccess && data) {
    return (
      <>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>성함</td>
              <td>이메일</td>
              <td>가입일</td>
              <td>등급</td>
              <td>상태</td>
              <td>관리</td>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <UsersTableItem key={user._id} user={user} />
            ))}
          </tbody>
        </table>
        <PaginateControl pageTotal={data.pagination.totalPages} />
      </>
    );
  }
}
