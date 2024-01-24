import React from 'react';
import Task from './Task.tsx';
import StyledHeader from '../Headers/StyledHeader.tsx';

const Tasks = ({ tasks, deleteTask }) => {
  return (
    <div>
      <StyledHeader text="Tasks" />
      <div className="bg-off-white-color bg-opacity-70 w-[350px] h-[285px] rounded-3xl px-4 pt-6">
        {tasks.map((task) => (
          <Task key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
