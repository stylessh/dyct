import { Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "@remix-run/react";
import {
  motion,
  useScroll,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

function Search() {
  const [, setSearchParams] = useSearchParams();
  const { scrollYProgress } = useScroll();

  const searchRef = useRef<HTMLFormElement>(null);
  const x = useMotionValue(0);
  const scale = useMotionValue(1);

  useTransform(() => {
    if (!searchRef.current) return;

    // if scroll reached 0.3, animate the search bar on position and scale

    if (scrollYProgress.get() > 0.3) {
      console.log("animating x value");

      animate(x, scrollYProgress, {
        type: "tween",
        duration: 0.5,
      });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if currentTarget is not an HTMLFormElement, return
    if (!(e.currentTarget[0] instanceof HTMLInputElement)) return;

    if (!e.currentTarget[0].value) return;

    setSearchParams({ q: e.currentTarget[0].value });

    e.currentTarget[0].value = "";
  };

  return (
    <motion.form
      className="bg-muted flex rounded-lg my-10 sticky top-6"
      onSubmit={handleSubmit}
      style={{ x, scale }}
    >
      <input
        type="text"
        placeholder="Airplane"
        className="flex-1 flex-grow p-4 rounded-l-lg bg-transparent"
      />

      <button className="p-4">
        <span className="sr-only">Search button</span>
        <SearchIcon size={20} className="text-accent" />
      </button>
    </motion.form>
  );
}

export default Search;
