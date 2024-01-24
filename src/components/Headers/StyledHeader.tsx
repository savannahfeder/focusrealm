// StyledHeader.tsx
import React from 'react';

type StyledHeaderProps = {
  text: string;
};

const StyledHeader: React.FC<StyledHeaderProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center mb-1">
      {/* You can adjust the w-1/4 to control the length of the lines */}
      <div className="border-t border-off-white-color w-14 mr-3" />
      <span className="text-off-white-color text-center font-normal">
        {text}
      </span>
      <div className="border-t border-off-white-color w-14 ml-3" />
    </div>
  );
};

export default StyledHeader;
