import "../css/Header.css";

import { Data, ScreenSize } from "../App";
import { useContext, useState, useEffect } from "react";

export default function Header({ selectedBoard }) {
  const screenSize = useContext(ScreenSize);

  return screenSize >= 768 ?
    <HeaderTablet selectedBoard={selectedBoard} />
    :
    <HeaderMobile selectedBoard={selectedBoard} />;
}


function HeaderMobile({ selectedBoard }) {
  const { data } = useContext(Data);
  const [isActive, setIsActive] = useState(false);
  const [isDotActive,setDotActive] =useState(false)

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const toggleDotmenu = () =>{
    setDotActive(!isDotActive)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isActive && !event.target.closest(".dropdown")) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDotActive && !event.target.closest(".dot-menu")) {
        setDotActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDotActive]);

  return (
    <>
      {isActive && <div className="overlay" onClick={() => setIsActive(false)}></div>}
      <header className="header-mobile">
        <div className="header-mobile-left">
          <img src="./img/logo.svg" alt="Logo" />
          <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
              Platform Launch
              {isActive ? (
                <img src="./img/up-arrow.svg" alt="up arrow" />
              ) : (
                <img src="./img/down-arrow.svg" alt="down arrow" />
              )}
            </button>
            {isActive && (
              <div className="dropdown-content">
                <h3>
                  All boards (<span>{data.length}</span>)
                </h3>
                {data.map((x, index) => (
                  <a key={index} href="#" className="header-dropdown-items">
                    <img src="./img/dropdown-logo.svg" alt="Dropdown Logo" />
                    {x.name}
                  </a>
                ))}
                <a href="#" className="header-createNew">
                  <img src="./img/dropdown-purple-logo.svg" alt="Dropdown Logo" /> + Create New Board
                </a>
                <div className="toggle-container">
                  <img src="./img/sun-logo.svg" alt="Sun" />
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                  <img src="./img/moon-logo.svg" alt="Moon" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="header-mobile-right">
          <button className="header-addNew-button"> <img src="./img/plus-icon.svg" alt="" /></button>
          <div className="drop-down-dot">
            <button className="dotBtn" onClick={toggleDotmenu}><img src="./img/dots.svg" alt="" /></button >
            {
              isDotActive &&(
                <div className="dot-menu">
                  <button className="editDot">Edit Board</button>
                  <button className="deleteDot">Delete Board</button>
                </div>
              )
            }
          </div>
        </div>
      </header>
    </>
  );
}




function HeaderTablet({ selectedBoard }) {
  return (
    <header>
      <h1>My Kanban Board Tablet</h1>
    </header>
  );
}
