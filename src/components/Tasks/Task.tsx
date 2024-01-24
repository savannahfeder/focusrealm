import React from 'react';

const Task = ({ task, deleteTask }) => {
  return (
    <div className="flex justify-between items-center bg-off-white-color h-12 px-3 rounded-3xl border-2 border-[#48260C] mt-3">
      <p className="font-normal text-1.5sm">{task.name}</p>
      <button
        className="text-2xl font-normal mb-1"
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        x
      </button>
    </div>
  );
};

export default Task;
