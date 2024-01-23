import React, { useState, useEffect } from 'react';
import './index.css';
import StartButton from './components/Buttons/StartButton.tsx';
import Skills from './components/Skills/Skills.tsx';
import MusicPlayer from './components/MusicPlayer/MusicPlayer.tsx';

type Skill = {
  level: number;
  xp: number;
};

export type SkillsType = {
  magic: Skill;
  combat: Skill;
  range: Skill;
};

const App = () => {
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<
    'magic' | 'combat' | 'range'
  >('combat');
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [skills, setSkills] = useState<SkillsType>({
    magic: {
      level: 1,
      xp: 0,
    },
    combat: {
      level: 1,
      xp: 0,
    },
    range: {
      level: 1,
      xp: 0,
    },
  });

  const toggleSession = () => {
    if (sessionInProgress === false) {
      startSession();
    } else {
      endSession();
    }
  };

  const startSession = () => {
    setSessionInProgress(true);
  };

  const endSession = () => {
    setSessionInProgress(false);
    const xpEarned = convertSecondsToXP(secondsPassed);
    addXpToSkill(selectedSkill, xpEarned);
    calculateNewLevels();
    // update local storage/database
  };

  const calculateNewLevels = () => {
    const newSkills = { ...skills };
    const skill = newSkills[selectedSkill];
    const xpToLevelUp = 5;
    const xpToLevelUpLeft = xpToLevelUp - skill.xp;
    if (xpToLevelUpLeft <= 0) {
      skill.level += 1;
      skill.xp = 0;
      calculateNewLevels();
    } else {
      setSkills(newSkills);
    }
  };

  const addXpToSkill = (skill: 'magic' | 'combat' | 'range', xp: number) => {
    const newSkills = { ...skills };
    newSkills[skill].xp += xp;
    setSkills(newSkills);
  };

  const convertSecondsToXP = (seconds: number) => {
    const xpPerSecond = 0.5;
    return seconds * xpPerSecond;
  };

  useEffect(() => {
    // Declare a variable for the timer.
    let timer: NodeJS.Timeout | null = null;

    if (sessionInProgress) {
      // If a session is in progress, start a timer that increments secondsPassed every second.
      timer = setInterval(() => {
        setSecondsPassed((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (timer) {
      // If a session is not in progress and a timer exists, clear the timer.
      clearInterval(timer);
    }

    // The function returned by useEffect is called a cleanup function.
    // React performs the cleanup when the component unmounts.
    return () => {
      // If a timer exists, clear the timer.
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [sessionInProgress]);

  return (
    <div className="background-desktop h-screen font-bold text-2xl relative">
      <div className="flex flex-row justify-end pt-8 pr-8">
        <Skills
          skills={skills}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
        />
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <StartButton
          handleClick={toggleSession}
          sessionInProgress={sessionInProgress}
        />
      </div>
      <MusicPlayer sessionInProgress={sessionInProgress} />
    </div>
  );
};

export default App;
