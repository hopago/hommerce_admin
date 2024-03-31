import { Skeleton } from "@nextui-org/react";

import { ReviewSelectCheckBoxSkeleton } from "./ReviewSelectedCheckBox";
import { ReviewActionsSkeleton } from "./ReviewActions";

import { cn } from "@/app/ui/lib/utils";

import styles from "./review-log-list.module.css";

export const TableRowSkeleton = () => {
  return (
    <>
      <ReviewSelectCheckBoxSkeleton />
      <td>
        <Skeleton className={cn("skeleton", styles.tdSkeleton)} />
      </td>
      <td>
        <Skeleton className={cn("skeleton", styles.tdSkeleton)} />
      </td>
      <td>
        <Skeleton className={cn("skeleton", styles.tdSkeleton)} />
      </td>
      <ReviewActionsSkeleton />
    </>
  );
};
