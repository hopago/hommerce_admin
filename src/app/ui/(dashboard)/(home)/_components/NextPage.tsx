"use client";

import { cn } from "@/app/ui/lib/utils";

import { MdArrowRight } from "react-icons/md";

import styles from "./pagination.module.css";
import { creatorFilterBooks } from "@/app/store/use-filter";

type NextPageProps = {
  onNextPage: (pageTotal: number) => void;
  disabled: boolean;
  pageTotal: number;
};

export default function NextPage({
  onNextPage,
  disabled,
  pageTotal,
}: NextPageProps) {
  const { setEnabled } = creatorFilterBooks();
  const onClick = () => {
    onNextPage(pageTotal);
  };

  return (
    <button
      type="button"
      className={cn(styles.nextPageButton, disabled && "disabled")}
      onClick={onClick}
      disabled={disabled}
    >
      <MdArrowRight className="icon" />
    </button>
  );
}
