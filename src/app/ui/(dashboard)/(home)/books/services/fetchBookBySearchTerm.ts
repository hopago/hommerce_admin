import { reactQueryFetcher } from "@/app/fetcher/fetcher";

import { createQueryString } from "../../utils/createQueryString";

import { BookFilterOption } from "../_components/FilterBooks";

type FetchBookBySearchTermParams = {
  filter?: BookFilterOption;
  searchTerm?: string;
  pageNum?: number;
  sort?: "최신순" | "오래된순";
};

const translateQueryValueToEn = (filter: BookFilterOption) => {
  const filterMap = {
    통합검색: null,
    제목: "title",
    저자: "author",
  };

  return filterMap[filter] || null;
};

export const fetchBookBySearchTerm = ({
  filter,
  searchTerm,
  pageNum,
  sort = "최신순",
}: FetchBookBySearchTermParams): Promise<BookData> => {
  let path = `/book`;

  const queryParams: Record<string, string> = {};

  if (filter) {
    const filterEn = translateQueryValueToEn(filter);
    if (filterEn) {
      queryParams.filter = filterEn;
    }
  }

  if (searchTerm && searchTerm.trim() !== "") {
    queryParams.keyword = searchTerm.trim();
  }

  queryParams.sort = sort;

  if (pageNum) {
    queryParams.pageNum = pageNum.toString();
  }

  const queryString = createQueryString(queryParams);
  path += `?${queryString}`;

  if (pageNum) {
    const pageNumQueryString = `pageNum=${pageNum}`;
    path += `&${pageNumQueryString}`;
  }

  return reactQueryFetcher<BookData>({
    method: "GET",
    path,
  });
};
