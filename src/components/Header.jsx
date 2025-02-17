import "../css/Header.css";

import { ScreenSize } from "../App";
import { useContext } from "react";

export default function Header({ selectedBoard }) {
  const screenSize = useContext(ScreenSize);

  return screenSize >= 768 ? 
  <HeaderTablet selectedBoard={selectedBoard} />
  : 
  <HeaderMobile selectedBoard={selectedBoard} />;
}


function HeaderMobile({ selectedBoard }) {
  return (
    <header>
      <h1>My Kanban Board Mobile</h1>
    </header>
  );
}

function HeaderTablet({ selectedBoard }) {
  return (
    <header>
      <h1>My Kanban Board Tablet</h1>
    </header>
  );
}
