import React from "react";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../redux/store";
import { setFilter, StatusTask } from "../../../redux/slices/task/taskSlice";

export const FilteredButtonBlock = () => {
  const dispatch = useAppDispatch();

  const changeTasksStatusFilter = (filter: StatusTask) => {
    dispatch(setFilter(filter));
  };

  return (
    <>
      <Button name="all" onClick={() => changeTasksStatusFilter("all")} />
      <Button name="active" onClick={() => changeTasksStatusFilter("active")} />
      <Button name="complete" onClick={() => changeTasksStatusFilter("complete")} />
    </>
  );
};
