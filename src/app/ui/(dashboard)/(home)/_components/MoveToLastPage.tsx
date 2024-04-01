"use client";

import styles from "./pagination.module.css";

type MoveToLastPageProps = {
  handleMoveToLastPage: (pageTotal: number) => void;
  pageTotal: number;
};

export default function MoveToLastPage({
  handleMoveToLastPage,
  pageTotal,
}: MoveToLastPageProps) {
  const onClick = () => {
    handleMoveToLastPage(pageTotal);
  };

  return (
    <button type="button" className={styles.lastPageButton} onClick={onClick}>
      <span>{pageTotal}</span>
    </button>
  );
}
