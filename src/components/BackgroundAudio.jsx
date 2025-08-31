import React, { useRef, useState, useEffect } from "react";

// Small floating music button: play once, then mute/unmute. Goes compact after a few seconds.
const BackgroundAudio = () => {
  const audioRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [compact, setCompact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const playAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    setError(null);
    setLoading(true);
    el.muted = false;
    el.volume = 0.6;
    el.play()
      .then(() => setHasPlayed(true))
      .catch(() => setError("Playback blocked. Tap again."))
      .finally(() => setLoading(false));
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  // "m" key mutes after it has started
  useEffect(() => {
    const onKey = (e) => {
      if (!hasPlayed) return;
      if (e.key.toLowerCase() === "m") {
        const tag = document.activeElement.tagName.toLowerCase();
        if (["input", "textarea", "select"].includes(tag)) return;
        toggleMute();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasPlayed]);

  // Shrink the button after 4s
  useEffect(() => {
    if (!hasPlayed) return;
    const t = setTimeout(() => setCompact(true), 4000);
    return () => clearTimeout(t);
  }, [hasPlayed]);

  const basePos =
    "fixed z-50 right-4 top-[5.5rem] sm:bottom-6 sm:left-6 sm:right-auto sm:top-auto";
  const btnCommon = `${basePos} focus:outline-none focus:ring-2 focus:ring-teal-400 transition transform hover:scale-105 rounded-full font-semibold sm:font-bold shadow-xl backdrop-blur-md`;
  const playBtn = `${btnCommon} animate-pulse px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white`;
  const ctrlBtn = `${btnCommon} bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center gap-1 ${
    compact
      ? "px-3 py-3 text-base"
      : "px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg"
  } text-white`;

  return (
    <>
      {!hasPlayed && (
        <button
          onClick={playAudio}
          className={playBtn}
          aria-label="Play background music"
          disabled={loading}
        >
          {loading ? "⌛" : "▶️"}{" "}
          <span className="hidden xs:inline">Play Music</span>
        </button>
      )}
      {hasPlayed && (
        <button
          onClick={toggleMute}
          className={ctrlBtn}
          aria-label={
            isMuted ? "Unmute background music" : "Mute background music"
          }
          aria-pressed={isMuted}
          title="Press M to toggle mute"
        >
          {isMuted ? "🔇" : "🔊"}
          <span
            className={`hidden sm:inline ${
              compact ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            {isMuted ? "Unmute" : "Mute"}
          </span>
        </button>
      )}
      <audio ref={audioRef} loop preload="auto" playsInline>
        <source src="/webAudio.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      {error && !hasPlayed && (
        <div className="absolute right-4 top-[9.5rem] sm:hidden text-[10px] bg-red-600/80 text-white px-2 py-1 rounded shadow">
          {error}
        </div>
      )}
    </>
  );
};

export default BackgroundAudio;
