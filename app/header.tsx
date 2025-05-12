import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function Header() {
  const cookies = new Cookies();
  const userToken = cookies.get("token");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (userToken) {
      setAuthenticated(true);
    }
  }, [userToken]);

  return (
    <header className="container mx-auto px-5 py-2">
      <nav className="flex justify-between">
        <a href={authenticated ? "/dashboard" : "/"}>
          <h1 className=" font-bold text-2xl">Contract-App</h1>
        </a>
      </nav>
    </header>
  );
}

export default Header;
