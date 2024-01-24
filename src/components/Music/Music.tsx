import React, { useEffect, useState } from 'react';
import musicIcon from '../../assets/icons/musicIcon.png';

interface MusicProps {
  songURL: string;
  setSongURL: React.Dispatch<React.SetStateAction<string>>;
}

const Music = ({ songURL, setSongURL }: MusicProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSongURL(value);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setValue(songURL);
  }, [songURL]);

  return (
    <div>
      {isOpen && (
        <input
          type="text"
          placeholder={value}
          className="font-normal text-1.5sm text-gray-900 bg-off-white-color rounded-full border border-brown-600 border-3 pl-4 pr-8 py-1 mr-3"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleSubmit(e)}
        />
      )}
      <img
        src={musicIcon}
        alt="music-icon"
        className="inline-block mr-4 mb-1 cursor-pointer hover:opacity-80"
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </div>
  );
};

export default Music;
