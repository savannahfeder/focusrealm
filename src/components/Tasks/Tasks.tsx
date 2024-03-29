import React from 'react';
import Task from './Task.tsx';
import StyledHeader from '../Headers/StyledHeader.tsx';

const Tasks = ({ tasks, deleteTask, editTask }) => {
  return (
    <div>
      <StyledHeader text="Tasks" />
      <div className="bg-off-white-color bg-opacity-70 w-[350px] h-[285px] rounded-3xl px-4 pt-6 overflow-auto">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
