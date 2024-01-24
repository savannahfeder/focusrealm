import React from 'react';

const AddTask = ({ addTask }) => {
  // handle submit on enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask(e.target.value);
      e.target.value = '';
    }
  };

  return (
    <div className="bg-off-white-color rounded-full pl-2 w-80 h-9 font-medium text-1.5sm">
      <input
        type="text"
        placeholder="Add task..."
        className="w-10/12 bg-transparent outline-none h-9 pl-2"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default AddTask;
