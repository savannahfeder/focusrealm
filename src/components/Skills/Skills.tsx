import React from 'react';
import magicIcon from '../../assets/skills/magic.png';
import rangeIcon from '../../assets/skills/range.png';
import combatIcon from '../../assets/skills/combat.png';

const Skills = () => {
  return (
    <div className="bg-gradient-to-b from-off-white-color via-off-white-color/70 to-orange-200 rounded-xl py-10">
      {' '}
      <div className="flex w-full justify-between px-5 font-normal text-1.5sm">
        <div className="px-5">
          <img
            src={magicIcon}
            alt="magic"
            className="w-20 h-20 border border-3 border-green-100 rounded-full"
          />
          <div className="text-center">Magic: 1</div>
        </div>
        <div className="px-5">
          <img src={combatIcon} alt="combat" className="w-20 h-20" />
          <div className="text-center">Combat: 1</div>
        </div>
        <div className="px-5">
          <img src={rangeIcon} alt="range" className="w-20 h-20" />
          <div className="text-center">Range: 1</div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
