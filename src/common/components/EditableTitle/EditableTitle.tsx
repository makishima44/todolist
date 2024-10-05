import React, { useState } from "react";
import s from "./EditableTitle.module.css";

type EditableTitleProps = {
  title: string;
  onChange: (newTitle: string) => void;
};

export const EditableTitle = ({ title, onChange }: EditableTitleProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const saveTitle = () => {
    onChange(newTitle);
    setEditMode(false);
  };

  return (
    <div className={s.editableTitleBlock}>
      {editMode ? (
        <input
          value={newTitle}
          onChange={onChangeTitle}
          onBlur={saveTitle}
          autoFocus
          className={s.editableInput}
        />
      ) : (
        <span onDoubleClick={activateEditMode} className={s.editableTitle}>
          {title}
        </span>
      )}
    </div>
  );
};
