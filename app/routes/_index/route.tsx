import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import Entry from "~/components/entry";
import Header from "~/components/header";
import Search from "~/components/search";
import Suggestions from "~/components/suggestions";
import { DictionaryResponse } from "~/types/data";

export const meta: MetaFunction = () => {
  return [
    { title: "Dyct - Straightfoward meanings." },
    { name: "description", content: "Search a word, get the meaning." },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // parse the search params for `?q=`
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  // https://api.dictionaryapi.dev/api/v2/entries/en/<word>

  if (!query) return json({ query: null, data: null });

  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    );
    const data = (await res.json()) as DictionaryResponse;

    if (data.resolution) {
      return json({ query, data: null });
    }

    return json({ query, data });
  } catch (error) {
    console.error(error);

    return json({ query, data: null });
  }
}

export default function Index() {
  const { query, data } = useLoaderData<typeof loader>();

  const shouldShowEntry = query && data;
  const shouldShowNotFound = query && !data;
  const shouldShowSuggestions = !query;

  return (
    <main className="container min-h-screen flex flex-col">
      <Header />
      <Search />

      <AnimatePresence>
        {shouldShowEntry && <Entry data={data} />}

        {shouldShowSuggestions && <Suggestions />}

        {shouldShowNotFound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="text-center text-2xl mt-10"
            key={`not-found-${query}`}
          >
            No results found for <strong>{query}</strong>.
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
