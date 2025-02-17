import "../css/Main.css";

import { useContext, useState } from "react";

import { Data } from "../App";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Main() {
  const { data, setData } = useContext(Data);
  const [selectedBoard, setSelectedBoard] = useState(data[0]);

  return (
    <>
      {/* <Header selectedBoard={selectedBoard} /> */}
      <main>
        <Sidebar selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} />
        <div className="main-grid-column-group">
          {selectedBoard.columns.map((column) => 
            <div key={column.id} className="main-grid-column-item">
              <h2 className="main-grid-column-title">{column.name} ({column.tasks.length})</h2>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
