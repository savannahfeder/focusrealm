import React from 'react';
import './index.css';
import StartButton from './components/Buttons/StartButton.tsx';
import Skills from './components/Skills/Skills.tsx';

const App = () => {
  const [sessionInProgress, setSessionInProgress] = React.useState(false);

  const toggleSession = () => {
    if (sessionInProgress === false) {
      startSession();
    } else {
      endSession();
    }
  };

  const startSession = () => {
    setSessionInProgress(true);
    // play music
    // start timer
  };

  const endSession = () => {
    setSessionInProgress(false);
    // increment xp and level up if relevant
  };

  return (
    <div className="background-desktop h-screen font-bold text-2xl relative">
      <div className="flex flex-row justify-end pt-8 pr-8">
        <Skills />
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        {' '}
        <StartButton
          handleClick={toggleSession}
          sessionInProgress={sessionInProgress}
        />
      </div>
    </div>
  );
};

export default App;
