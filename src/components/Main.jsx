import "../css/Main.css";

import { useContext, useState } from "react";

import { Data } from "../App";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Main() {
  const { data, setData } = useContext(Data);
  const [selectedBoard, setSelectedBoard] = useState(data[0].name);

  return (
    <>
      <Header selectedBoard={selectedBoard} />
      <main>
        <Sidebar selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} />
      </main>
    </>
  );
}
