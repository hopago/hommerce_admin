import { reactQueryFetcher } from "@/app/fetcher/fetcher";
import { createQueryString } from "../../utils/createQueryString";
import { PaginatedUserResponse } from "../../types/user";

export const getUsers = async (pageNum: number) => {
  if (!pageNum) return;

  const pageNumQueryString = createQueryString({ pageNum: pageNum.toString() });

  try {
    const users = await reactQueryFetcher<PaginatedUserResponse>({
      path: `/user/users?${pageNumQueryString}`,
      method: "GET",
    });

    return users;
  } catch (err) {
    throw err;
  }
};
