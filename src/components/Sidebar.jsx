import "../css/Sidebar.css"

import { useContext, useEffect, useState } from "react";

import { Data, } from "../App";

export default function Sidebar({ selectedBoard, setSelectedBoard, isHidden, setHidden }) {
  const { data } = useContext(Data);

  return (
    <>
      {isHidden ? (
        <div className="hidden-button">
          <button className="show-sidebar" onClick={() => setHidden(false)}>
            <img src="./img/eye.svg" />
          </button>
        </div>
      ) : (
        <aside>
          <div className="sidebar-up">
            <div className="side-bar-menu">
              <h3>
                All boards (<span>{data.length}</span>)
              </h3>
              {data.map((x, index) => (
                <button key={index} className={`header-dropdown-items ${selectedBoard.name === x.name ? "active-board" : ""}`} onClick={() => {
                  setSelectedBoard(x);
                }}>
                  <img src="./img/dropdown-logo.svg" alt="Dropdown Logo" />
                  {x.name}
                </button>
              ))}
              <button className="header-createNew">
                <img src="./img/dropdown-purple-logo.svg" alt="Dropdown Logo" /> + Create New Board
              </button>
            </div>
          </div>
          <div className="sidebar-down">
            <div className="side-bar-toggle">
              <div className="toggle-container">
                <img src="./img/sun-logo.svg" alt="Sun" />
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
                <img src="./img/moon-logo.svg" alt="Moon" />
              </div>
            </div>
            <div className="side-bar-hidden-container">
              <button className="side-bar-hidden" onClick={() => setHidden(true)}>
                <img src="./img/hidden-logo.svg" alt="" />
                <p>Hide Sidebar</p>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
