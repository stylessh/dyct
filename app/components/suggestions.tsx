import { useSearchParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

function Suggestions() {
  const [, setSearchParams] = useSearchParams();

  const { data, isLoading, error } = useQuery<string[]>({
    queryKey: ["suggestions"],

    queryFn: async () => {
      const res = await fetch(
        "https://random-word-api.herokuapp.com/word?lang=en&number=20"
      );

      return res.json();
    },

    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 30000, // getting new suggestions every 30s (milliseconds)
  });

  // mimic skeleton from content html
  if (isLoading)
    return (
      <div className="flex flex-col gap-y-6">
        <div className="w-full h-12 bg-muted animate-pulse" />

        <div className="grid grid-cols-auto-fit-100 w-full gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="w-full h-12 bg-muted animate-pulse rounded-md"
            />
          ))}
        </div>
      </div>
    );

  if (error) return <div>Failed to load suggestions</div>;

  return (
    <section className="grid grid-cols-auto-fit-100 w-full gap-4">
      <header className="col-span-full">
        <h1 className="text-3xl font-bold mb-4">
          Here are some suggestions for you
        </h1>
      </header>

      <AnimatePresence>
        {data?.map((word, i) => (
          <motion.button
            key={`${word}-${i}`}
            onClick={() => setSearchParams({ q: word })}
            className="font-medium border w-full p-2 rounded-md skeuomorphic"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.2,
                delay: 0.5 + i * 0.006,
                ease: "backInOut",
              },
            }}
            exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.5 } }}
            whileTap={{ scale: 0.98 }}
          >
            {word}
          </motion.button>
        ))}
      </AnimatePresence>
    </section>
  );
}

export default Suggestions;
