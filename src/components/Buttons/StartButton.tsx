import React from 'react';
import playIcon from '../../assets/icons/playIcon.svg';

const StartButton = ({ handleClick, sessionInProgress }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-off-white-color bg-opacity-90 hover:bg-opacity-100 transition duration-500 ease-in-out cursor-pointer text-brown-500 font-medium py-2 px-12 rounded-2xl"
    >
      <img src={playIcon} alt="play-icon" className="inline-block mr-4 mb-1" />
      {sessionInProgress ? 'End Session' : 'Start Session'}
    </button>
  );
};

export default StartButton;
