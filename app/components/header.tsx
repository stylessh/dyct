import { Link } from "@remix-run/react";
import Logo from "./ui/logo";
import Theme from "./theme";

function Header() {
  return (
    <header className="flex justify-between items-center my-6">
      <Link to="/">
        <Logo className="size-12" />
        <span className="sr-only">Dyct</span>
      </Link>

      <Theme />
    </header>
  );
}

export default Header;
