import React, { useState, useEffect } from 'react';
import './index.css';
import StartButton from './components/Buttons/StartButton.tsx';
import Skills from './components/Skills/Skills.tsx';
import MusicPlayer from './components/MusicPlayer/MusicPlayer.tsx';
import SessionStats from './components/SessionStats/SessionStats.tsx';
import Music from './components/Music/Music.tsx';
import Tasks from './components/Tasks/Tasks.tsx';
import AddTask from './components/Tasks/AddTask.tsx';

type Skill = {
  level: number;
  xp: number;
};

export type SkillsType = {
  magic: Skill;
  combat: Skill;
  range: Skill;
};

type Task = {
  id: number;
  name: string;
};

const App = () => {
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<
    'magic' | 'combat' | 'range'
  >('combat');
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [levelsGained, setLevelsGained] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
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

  const addTask = (taskName: string) => {
    const taskId = generateRandomNumber();
    const task = {
      id: taskId,
      name: taskName,
    };
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const deleteTask = (taskId: number) => {
    const tasksCopy = [...tasks];
    const newTasks = tasksCopy.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const editTask = (taskId: number, newTaskName: string) => {
    const tasksCopy = [...tasks];
    const taskIndex = tasksCopy.findIndex((task) => task.id === taskId);
    tasksCopy[taskIndex].name = newTaskName;
    setTasks(tasksCopy);
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const retrieveTasksFromLocalStorage = () => {
    const storedData = localStorage.getItem('tasks');

    try {
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        return parsedData;
      }
    } catch (e) {
      console.error('Parsing error in retrieveTasksFromLocalStorage:', e);
      // Handle the error, possibly by initializing to a default value
      return null; // or return null if that's your intended default state
    }
    return null; // or [] if you want to initialize to an empty array by default
  };

  const updateTasksOnLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
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
    const tasks = retrieveTasksFromLocalStorage();
    if (tasks) {
      setTasks(tasks);
    }
  }, []);

  useEffect(() => {
    updateSkillsDataOnLocalStorage(skills);
  }, [skills]);

  useEffect(() => {
    setSongURLOnLocalStorage(songURL);
  }, [songURL]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      // Check if there are tasks to save
      updateTasksOnLocalStorage(tasks);
    }
  }, [tasks]);

  return (
    <div className="background-desktop h-screen font-bold text-2xl relative">
      <div className="flex justify-between pt-8 px-8">
        <SessionStats
          secondsWorked={secondsPassed}
          xpGained={xpGained}
          selectedSkill={selectedSkill}
          levelsGained={levelsGained}
        />
        <AddTask addTask={addTask} />
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
      <div className="absolute bottom-5 left-7">
        {tasks.length > 0 && (
          <Tasks tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
        )}
      </div>
      <MusicPlayer songURL={songURL} sessionInProgress={sessionInProgress} />
    </div>
  );
};

export default App;
