import React, { useState } from "react";

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
    <div>
      {editMode ? (
        <input
          value={newTitle}
          onChange={onChangeTitle}
          onBlur={saveTitle}
          autoFocus
        />
      ) : (
        <h3 onDoubleClick={activateEditMode}>{title}</h3>
      )}
    </div>
  );
};
