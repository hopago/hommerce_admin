"use client";

import { QueryClient } from "@tanstack/react-query";

import { useMemo } from "react";

export const getQueryClient = () => {
  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
            retry: false,
          },
        },
      }),
    []
  );

  return client;
};

export const QueryKeys = {
  USER: "user",
  USERS: "users",
  USER_SEARCH: "userSearchResults",
  USER_SESSION: "userSession",
  USER_REVIEW: "userReviews",
  USER_POINT: "userPoint",
  USER_POINT_LOG: "userPointLogs",
  BOOK: "book",
  BOOK_DETAIL: "bookDetails",
};
