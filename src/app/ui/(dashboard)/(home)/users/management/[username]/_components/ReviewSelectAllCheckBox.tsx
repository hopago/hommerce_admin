import { FaCheck } from "react-icons/fa";

import { BUTTON_CLASS } from "../../../../constants/classNames";

import Button from "../../../../_components/Button";

import { useSelectReview } from "@/app/store/use-select-review";

import { useEffect } from "react";

type ReviewSelectAllCheckBoxProps = {
  ids: string[];
};

export default function ReviewSelectAllCheckBox({
  ids,
}: ReviewSelectAllCheckBoxProps) {
  const {
    ids: stateIds,
    isSelectedAll,
    totalLength,
    setIsSelectedAll,
    setTotalLength,
    toggleSelectAll,
  } = useSelectReview();

  const onClick = () => {
    toggleSelectAll(ids);
  };

  useEffect(() => {
    setTotalLength(ids.length);
  }, [ids.length]);

  useEffect(() => {
    if (stateIds.length === totalLength) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [stateIds, totalLength]);

  return (
    <td>
      <Button
        type="button"
        icon={<FaCheck />}
        onClick={onClick}
        className={BUTTON_CLASS.SELECT_ALL}
        active={isSelectedAll}
      />
    </td>
  );
}
