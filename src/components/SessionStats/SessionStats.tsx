import React from 'react';
import { gradientContainerStyles } from '../utils/general.ts';

const SessionStats = ({
  secondsWorked,
  selectedSkill,
  xpGained,
  levelsGained,
}) => {
  const convertSecondsToHoursAndMinutes = (seconds) => {
    if (seconds) {
      const hours = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      return '00:00';
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
