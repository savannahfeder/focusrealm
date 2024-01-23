import React from 'react';
import magicIcon from '../../assets/skills/magic.png';
import rangeIcon from '../../assets/skills/range.png';
import combatIcon from '../../assets/skills/combat.png';
import { SkillsType } from '../../App';

interface SkillsProps {
  skills: SkillsType;
  selectedSkill: 'magic' | 'combat' | 'range';
  setSelectedSkill: React.Dispatch<
    React.SetStateAction<'magic' | 'combat' | 'range'>
  >;
}

const Skills = ({ skills, selectedSkill, setSelectedSkill }: SkillsProps) => {
  const selectedSkillStyle = 'border border-5 border-[#CE9400] rounded-full';
  const selectedSkillTextStyle = 'font-extrabold';

  return (
    <div className="bg-gradient-to-b from-off-white-color via-off-white-color/70 to-orange-200 rounded-xl py-10">
      <div className="flex w-full justify-between px-5 font-normal text-1.5sm">
        <div className="px-5">
          <img
            src={magicIcon}
            alt="magic"
            className={`w-20 h-20 cursor-pointer hover:opacity-90 ${
              selectedSkill === 'magic' && selectedSkillStyle
            }`}
            onClick={() => setSelectedSkill('magic')}
          />
          <div
            className={`text-center ${
              selectedSkill === 'magic' && selectedSkillTextStyle
            }`}
          >
            Magic: {skills.magic.level}
          </div>
        </div>
        <div className="px-5">
          <img
            src={combatIcon}
            alt="combat"
            className={`w-20 h-20 cursor-pointer hover:opacity-90 ${
              selectedSkill === 'combat' && selectedSkillStyle
            }`}
            onClick={() => setSelectedSkill('combat')}
          />
          <div
            className={`text-center ${
              selectedSkill === 'combat' && selectedSkillTextStyle
            }`}
          >
            Combat: {skills.combat.level}
          </div>
        </div>
        <div className="px-5">
          <img
            src={rangeIcon}
            alt="range"
            className={`w-20 h-20 cursor-pointer hover:opacity-90 ${
              selectedSkill === 'range' && selectedSkillStyle
            }`}
            onClick={() => setSelectedSkill('range')}
          />
          <div
            className={`text-center ${
              selectedSkill === 'range' && selectedSkillTextStyle
            }`}
          >
            Range: {skills.range.level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
