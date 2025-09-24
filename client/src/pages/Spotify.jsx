import "./Spotify.css";
import React, { useState } from "react";

const tracks = [
  {
    name: "Gentle Piano",
    artist: "Relaxing Sounds",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    name: "Soft Ambient",
    artist: "Ambient Relaxation",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    name: "Forest Stream",
    artist: "Nature Sounds",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    name: "Calm Ocean Waves",
    artist: "Nature Ambience",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    name: "Peaceful Meditation",
    artist: "Relaxing Music",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
];

const Spotify = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  const playTrack = (track) => {
    setCurrentTrack(track);
    audio.src = track.url;
    audio.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app-container">
      <div className="music-player">
        <h2>Calm & Soothing Music</h2>
        <ul>
          {tracks.map((track, i) => (
            <li key={i}>
              <div>
                <strong>{track.name}</strong> by {track.artist}
              </div>
              <button onClick={() => playTrack(track)}>Play</button>
            </li>
          ))}
        </ul>

        {currentTrack && (
          <div className="now-playing">
            <h3>Now Playing: {currentTrack.name}</h3>
            <button onClick={togglePlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotify;
