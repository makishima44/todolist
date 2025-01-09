import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../redux/store";
import { setFilter } from "../../../redux/slices/task/taskSlice";
import { StatusTask } from "../../../redux/types/types";
import { memo, useCallback } from "react";

import s from "./FilteredButtonBlock.module.css";

type FilteredButtonBlockProps = {
  todolistId: string;
};

export const FilteredButtonBlock = memo(({ todolistId }: FilteredButtonBlockProps) => {
  const dispatch = useAppDispatch();

  const changeTasksStatusFilter = useCallback(
    (filter: StatusTask) => {
      dispatch(setFilter({ todolistId, filter }));
    },
    [dispatch, todolistId]
  );

  return (
    <div className={s.filterBlock}>
      <Button name="all" onClick={() => changeTasksStatusFilter("all")} />
      <Button name="active" onClick={() => changeTasksStatusFilter("active")} />
      <Button name="complete" onClick={() => changeTasksStatusFilter("complete")} />
    </div>
  );
});
