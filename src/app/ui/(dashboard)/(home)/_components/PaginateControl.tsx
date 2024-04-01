"use client";

import PrevPage from "./PrevPage";
import MoveToFirstPage from "./MoveToFirstPage";
import SetPage from "./SetPage";
import MoveToLastPage from "./MoveToLastPage";
import NextPage from "./NextPage";

import styles from "./pagination.module.css";

import { PAGE_THRESHOLD } from "../constants/pagination";

type PaginateControlProps = {
  pageTotal: number | undefined;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: (pageTotal: number) => void;
  handleSetPage: (pageNum: number) => void;
  handleMoveToFirstPage: () => void;
  handleMoveToLastPage: (pageTotal: number) => void;
};

export default function PaginateControl({
  pageTotal,
  currentPage,
  handleMoveToFirstPage,
  handleMoveToLastPage,
  handleNextPage,
  handlePrevPage,
  handleSetPage,
}: PaginateControlProps) {
  const prevPageDisabled = currentPage === 1;
  const nextPageDisabled = currentPage === pageTotal;

  if (pageTotal) {
    return (
      <div className={styles.container}>
        <PrevPage onPrevPage={handlePrevPage} disabled={prevPageDisabled} />
        {currentPage > PAGE_THRESHOLD && (
          <MoveToFirstPage handleMoveToFirstPage={handleMoveToFirstPage} />
        )}
        <SetPage
          currPage={currentPage}
          total={pageTotal}
          onSetPage={handleSetPage}
        />
        {pageTotal - PAGE_THRESHOLD > currentPage && (
          <MoveToLastPage
            pageTotal={pageTotal}
            handleMoveToLastPage={handleMoveToLastPage}
          />
        )}
        <NextPage
          onNextPage={handleNextPage}
          disabled={nextPageDisabled}
          pageTotal={pageTotal}
        />
      </div>
    );
  }
}
