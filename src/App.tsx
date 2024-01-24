import React, { useState, useEffect } from 'react';
import './index.css';
import StartButton from './components/Buttons/StartButton.tsx';
import Skills from './components/Skills/Skills.tsx';
import MusicPlayer from './components/MusicPlayer/MusicPlayer.tsx';
import SessionStats from './components/SessionStats/SessionStats.tsx';
import Music from './components/Music/Music.tsx';

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
  const [xpGained, setXpGained] = useState(0);
  const [levelsGained, setLevelsGained] = useState(0);
  const [songURL, setSongURL] = useState('');
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
    // const xpEarned = convertSecondsToXP(secondsPassed);
    // const skillsUpdatedXp = addXpToSkill(selectedSkill, xpEarned);
    // const skillsUpdatedLevelsAndXp = calculateNewLevels(skillsUpdatedXp);
    // updateSkillsDataOnLocalStorage(skillsUpdatedLevelsAndXp);
    calculateNewLevels(skills);
    updateSkillsDataOnLocalStorage(skills);
    setSecondsPassed(0);
    setXpGained(0);
  };

  const calculateNewLevels = (newSkills) => {
    const skill = newSkills[selectedSkill];
    const xpToLevelUp = 5;
    let newLevel = Math.floor(skill.xp / xpToLevelUp) + 1; // Calculate new level based on total XP
    let levelsGained = newLevel - skill.level; // Calculate how many levels were gained

    if (levelsGained > 0) {
      skill.level = newLevel; // Update the level
      setSkills(newSkills); // Update the skills state
      setLevelsGained((prevLevels) => prevLevels + levelsGained); // Update levels gained
    }
  };

  const addXpToSkill = (skill: 'magic' | 'combat' | 'range', xp: number) => {
    const newSkills = { ...skills };
    newSkills[skill].xp += xp;
    setSkills(newSkills);
    return newSkills;
  };

  const convertSecondsToXP = (seconds: number) => {
    const xpPerSecond = 0.5;
    return seconds * xpPerSecond;
  };

  useEffect(() => {
    let levelUpdateTimer: NodeJS.Timeout | null = null;

    if (sessionInProgress) {
      levelUpdateTimer = setInterval(() => {
        calculateNewLevels(skills);
      }, 3000); // 20 seconds
    } else if (levelUpdateTimer) {
      clearInterval(levelUpdateTimer);
    }

    return () => {
      if (levelUpdateTimer) {
        clearInterval(levelUpdateTimer);
      }
    };
  }, [skills]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (sessionInProgress) {
      timer = setInterval(() => {
        setSecondsPassed((prevSeconds) => {
          const newSeconds = prevSeconds + 5;
          const localXpGained = convertSecondsToXP(newSeconds);
          setXpGained(localXpGained);
          addXpToSkill(selectedSkill, localXpGained);
          return newSeconds;
        });
      }, 5000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [sessionInProgress, selectedSkill, skills]);

  const getSkillsDataFromLocalStorage = (): SkillsType | null => {
    const storedData = localStorage.getItem('skills');

    if (storedData) {
      const parsedData: SkillsType = JSON.parse(storedData);
      return parsedData;
    } else {
      return null;
    }
  };

  const getSongURLFromLocalStorage = (): string | null => {
    const storedData = localStorage.getItem('songURL');

    if (storedData) {
      const parsedData: string = JSON.parse(storedData);
      return parsedData;
    } else {
      return null;
    }
  };

  const setSongURLOnLocalStorage = (songURL: string) => {
    if (songURL) {
      localStorage.setItem('songURL', JSON.stringify(songURL));
    }
  };

  const updateSkillsDataOnLocalStorage = (skillsData: SkillsType | null) => {
    if (skillsData) {
      localStorage.setItem('skills', JSON.stringify(skillsData));
    }
  };

  useEffect(() => {
    const skillsData = getSkillsDataFromLocalStorage();
    if (skillsData) {
      setSkills(skillsData);
    }
    const songURL = getSongURLFromLocalStorage();
    if (songURL) {
      setSongURL(songURL);
    }
  }, []);

  useEffect(() => {
    setSongURLOnLocalStorage(songURL);
  }, [songURL]);

  return (
    <div className="background-desktop h-screen font-bold text-2xl relative">
      <div className="flex justify-between pt-8 px-8">
        <SessionStats
          secondsWorked={secondsPassed}
          xpGained={xpGained}
          selectedSkill={selectedSkill}
          levelsGained={levelsGained}
        />
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
      <div className="absolute bottom-3 right-3">
        <Music setSongURL={setSongURL} songURL={songURL ? songURL : ''} />
      </div>
      <MusicPlayer songURL={songURL} sessionInProgress={sessionInProgress} />
    </div>
  );
};

export default App;
