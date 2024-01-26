import React, { useState } from 'react';

const Task = ({ task, deleteTask, editTask }) => {
  const [editedTaskName, setEditedTaskName] = useState(task.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveTask();
    }
  };

  const handleEditChange = (e) => {
    setEditedTaskName(e.target.value);
    setIsEditing(true);
  };

  const saveTask = () => {
    editTask(task.id, editedTaskName);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-off-white-color h-12 px-3 rounded-3xl border-2 border-[#48260C] mt-3">
      <input
        type="text"
        value={editedTaskName}
        onChange={handleEditChange}
        onKeyPress={handleKeyPress}
        className="flex-1 font-normal text-1.5sm bg-transparent outline-none"
      />
      {isEditing ? (
        <button className="text-2xl font-normal mb-1" onClick={saveTask}>
          ✓
        </button>
      ) : (
        <button
          className="text-2xl font-normal mb-1"
          onClick={() => deleteTask(task.id)}
        >
          x
        </button>
      )}
    </div>
  );
};

export default Task;
