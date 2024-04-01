import { cn } from "@/app/ui/lib/utils";

import styles from "./pagination.module.css";

type SetPageButtonProps = {
  page: number;
  currPage: number;
  onSetPage: (pageNumber: number) => void;
};

export default function SetPageButton({
  page,
  currPage,
  onSetPage,
}: SetPageButtonProps) {
  const setPageDisabled = (page: number) => currPage === page;

  const onClick = (page: number) => {
    onSetPage(page);
  };

  return (
    <button
      className={cn(styles.setPageButton, page === currPage && styles.active)}
      onClick={() => onClick(page)}
      disabled={setPageDisabled(page)}
    >
      {page}
    </button>
  );
}
