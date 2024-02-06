import { motion } from "framer-motion";
import { DictionaryResponse } from "~/types/data";
import EntryAudio from "./audio";
import Meaning from "./meaning";

interface EntryProps {
  data: DictionaryResponse;
}

function Entry({ data }: EntryProps) {
  if (typeof data.resolution !== "undefined") return;

  const word = data[0]; // For now we'll just show the first word

  //   find phonetic with audio, if not found, use the first phonetic by default
  const phonetic =
    word.phonetics?.find((phonetic) => phonetic.audio) || word.phonetics?.[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      key={word.word}
    >
      <header className="flex justify-between items-center">
        <article className="flex flex-col gap-y-4">
          <h1 className="text-7xl font-black">{word.word}</h1>

          {phonetic && <p className="text-accent text-xl">{phonetic.text}</p>}
        </article>

        {phonetic?.audio && <EntryAudio audio={phonetic.audio} />}
      </header>

      <Meaning meaning={word.meanings} />
    </motion.section>
  );
}

export default Entry;
