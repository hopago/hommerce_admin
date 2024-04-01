"use client";

import { getPaginationWindow } from "../utils/getPaginationWindow";

import SetPageButton from "./SetPageButton";

import styles from "./pagination.module.css";

type SetPageProps = {
  onSetPage: (pageNumber: number) => void;
  total: number;
  currPage: number;
};

export default function SetPage({ onSetPage, total, currPage }: SetPageProps) {
  const { pages, endPage } = getPaginationWindow({ currPage, total });

  return (
    <div className={styles.setPageButtonContainer}>
      {pages.map((page) => (
        <SetPageButton
          key={page}
          page={page}
          currPage={currPage}
          onSetPage={onSetPage}
        />
      ))}
      {endPage < total && <span className={styles.textEclipse}>...</span>}
    </div>
  );
}
