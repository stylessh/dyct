import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function EntryAudio({ audio }: { audio: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    // load audio on mount
    if (audio) audio.load();

    return () => {
      if (audio) {
        audio.pause();
        audio.remove();
      }
    };
  }, [audio]);

  const handleEntryAudioClick = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.paused ? audio.play() : audio.pause();
    setIsPlaying(!audio.paused);
  };

  return (
    <AnimatePresence initial={false} mode="sync">
      <audio
        ref={audioRef}
        src={audio}
        key="audio"
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
      >
        <track kind="captions" />
      </audio>

      <motion.button
        className="size-20 rounded-full grid place-items-center bg-accent/10"
        onClick={handleEntryAudioClick}
        whileTap={{ scale: 0.9 }}
        key="audio-button"
      >
        {!isPlaying ? (
          <motion.span
            // scale in-out
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            key="play"
          >
            <Play size={24} className="text-accent ml-1" />
          </motion.span>
        ) : (
          <motion.span
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            key="pause"
          >
            <Pause size={24} className="text-accent ml-1" />
          </motion.span>
        )}
      </motion.button>
    </AnimatePresence>
  );
}

export default EntryAudio;
