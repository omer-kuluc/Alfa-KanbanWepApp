import { createContext, useEffect, useState } from "react";

import Main from "./components/Main";
import { Toaster } from "react-hot-toast";

export const Data = createContext(null);
export const ScreenSize = createContext(null);
export default function App() {
  const [data, setData] = useState([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => setData(data.boards));

    window.addEventListener("resize", () => setScreenSize(window.innerWidth));
  }, []);
  
  return (
    <ScreenSize.Provider value={screenSize}>
      <Data.Provider value={{ data, setData }}>
        <Toaster 
          position="top-center"
          reverseOrder={false}
        />
        {data.length > 0 && <Main />}
      </Data.Provider>
    </ScreenSize.Provider>
  );
}
