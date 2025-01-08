import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../redux/store";
import { setFilter } from "../../../redux/slices/task/taskSlice";
import { StatusTask } from "../../../redux/types/types";
import { memo } from "react";

type FilteredButtonBlockProps = {
  todolistId: string;
};

export const FilteredButtonBlock = memo(({ todolistId }: FilteredButtonBlockProps) => {
  const dispatch = useAppDispatch();

  const changeTasksStatusFilter = (filter: StatusTask) => {
    dispatch(setFilter({ todolistId, filter }));
  };

  return (
    <>
      <Button name="all" onClick={() => changeTasksStatusFilter("all")} />
      <Button name="active" onClick={() => changeTasksStatusFilter("active")} />
      <Button name="complete" onClick={() => changeTasksStatusFilter("complete")} />
    </>
  );
});
