import { useEffect } from "react";

import Main from "./components/Main";

function App() {
  useEffect(() => {
    const hours = new Date().getHours();
    const isDay = hours > 6 && hours < 20;
    if (isDay) document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <Main />
    </>
  );
}

export default App;
