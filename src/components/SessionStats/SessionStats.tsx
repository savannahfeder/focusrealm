import React from 'react';
import { gradientContainerStyles } from '../utils/general.ts';

const SessionStats = ({
  secondsWorked,
  selectedSkill,
  xpGained,
  levelsGained,
}) => {
  console.log(
    'seconds worked',
    secondsWorked,
    'xp gained',
    xpGained,
    'levels gained',
    levelsGained
  );

  const convertSecondsToHoursAndMinutes = (seconds) => {
    if (seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}:${minutes}`;
    } else {
      return '0:00';
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formattedSkill = capitalizeFirstLetter(selectedSkill);

  return (
    <div className={`px-20 pt-8 h-36 ${gradientContainerStyles}`}>
      <div className="font-semibold">
        {convertSecondsToHoursAndMinutes(secondsWorked)} Hours Worked
      </div>
      <div className="font-medium text-sm pl-6 mt-2">
        <p>
          {xpGained} {formattedSkill} XP Gained
        </p>
        <p>
          {levelsGained}x {formattedSkill}{' '}
          {levelsGained === 1 ? 'Level' : 'Levels'} Achieved
        </p>
      </div>
    </div>
  );
};

export default SessionStats;
