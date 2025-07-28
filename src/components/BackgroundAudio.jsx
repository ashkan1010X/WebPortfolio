import React, { useRef, useState } from "react";

const BackgroundAudio = () => {
  const audioRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlay = () => {
    audioRef.current
      .play()
      .then(() => {
        setHasPlayed(true);
      })
      .catch((err) => {
        console.error("Audio play failed:", err);
      });
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const baseButtonClass =
    "fixed bottom-6 left-6 z-50 px-6 py-3 rounded-full font-bold text-lg shadow-xl transition transform hover:scale-105 animate-pulse";

  return (
    <>
      {!hasPlayed ? (
        <button
          onClick={handlePlay}
          className={`${baseButtonClass} bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white`}
        >
          ▶️ Play Music
        </button>
      ) : (
        <button
          onClick={toggleMute}
          className={`${baseButtonClass} bg-gradient-to-r from-blue-500 to-indigo-600 text-white`}
        >
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>
      )}

      <audio ref={audioRef} loop>
        <source src="/webAudio.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default BackgroundAudio;
