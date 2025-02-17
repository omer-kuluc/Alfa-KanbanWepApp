import { createContext, useEffect, useState } from "react";

export const Data = createContext(null);
export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => setData(data.boards));
  }, []);

  return (
    <Data.Provider value={{ data, setData }}>
      
    </Data.Provider>
  );
}
