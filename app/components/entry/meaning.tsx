import { DictionaryEntry } from "~/types/data";

interface MeaningProps {
  meaning: DictionaryEntry["meanings"];
}

function Meaning({ meaning }: MeaningProps) {
  return (
    <>
      {meaning.map((meaning) => (
        <article className="my-10" key={meaning.partOfSpeech}>
          <header className="flex items-center justify-between gap-x-6">
            <h2 className="text-xl font-bold">{meaning.partOfSpeech}</h2>
            <div className="w-full flex-1 flex-grow h-0.5 bg-muted rounded-full" />
          </header>

          <div className="p-4">
            <h4 className="font-light text-gray-500 text-lg mb-4">Meaning</h4>

            <ul className="list-disc  flex flex-col gap-y-2 marker:inline-flex marker:text-accent">
              {meaning.definitions.slice(0, 3).map((definition, index) => (
                <li key={index}>
                  <p className="text-lg block">{definition.definition}</p>

                  {definition.example && (
                    <p className="text-gray-500 italic mt-1">
                      {`"${definition.example}"`}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </>
  );
}

export default Meaning;
