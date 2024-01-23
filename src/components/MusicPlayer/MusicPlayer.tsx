import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

interface MusicPlayerProps {
  sessionInProgress: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ sessionInProgress }) => {
  const [player, setPlayer] = useState<any>(null);
  const videoId = '1gwoy0bMyeg';

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  useEffect(() => {
    if (player) {
      const playerState = player.getPlayerState();
      if (sessionInProgress && playerState !== 1) {
        // 1 is the state for playing
        player.playVideo();
      } else if (!sessionInProgress && playerState === 1) {
        // Pause only if the video is playing
        player.pauseVideo();
      }
    }
  }, [sessionInProgress, player]);

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
};

export default MusicPlayer;
