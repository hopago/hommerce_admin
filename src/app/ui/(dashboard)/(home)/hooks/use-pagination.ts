import { useState } from "react";

interface UseCreatorPaginationReturn {
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: (pageTotal: number) => void;
  handleSetPage: (pageNum: number) => void;
  handleMoveToFirstPage: () => void;
  handleMoveToLastPage: (pageTotal: number) => void;
}

export default function useCreatorPagination(): UseCreatorPaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = (pageTotal: number) => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageTotal));
  };

  const handleSetPage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const handleMoveToFirstPage = () => {
    setCurrentPage(1);
  };

  const handleMoveToLastPage = (pageTotal: number) => {
    setCurrentPage(pageTotal);
  };

  return {
    currentPage,
    handlePrevPage,
    handleNextPage,
    handleSetPage,
    handleMoveToFirstPage,
    handleMoveToLastPage,
  };
}
