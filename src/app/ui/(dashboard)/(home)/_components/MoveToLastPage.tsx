"use client";

import { creatorFilterBooks } from "@/app/store/use-filter";
import styles from "./pagination.module.css";

type MoveToLastPageProps = {
  handleMoveToLastPage: (pageTotal: number) => void;
  pageTotal: number;
};

export default function MoveToLastPage({
  handleMoveToLastPage,
  pageTotal,
}: MoveToLastPageProps) {
  const { setEnabled } = creatorFilterBooks();

  const onClick = () => {
    handleMoveToLastPage(pageTotal);
    setEnabled(true);
  };

  return (
    <button type="button" className={styles.lastPageButton} onClick={onClick}>
      <span>{pageTotal}</span>
    </button>
  );
}
