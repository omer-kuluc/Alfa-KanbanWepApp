import "../css/Header.css";

import { Data, ScreenSize } from "../App";

import { useContext, useState, useEffect } from "react";

export default function Header({ deleteBoardDialogRef, setIsNewColumn, selectedBoard, newTaskDialogRef, newBoardDialogRef, editBoardDialogRef, setSelectedBoard }) {
  const screenSize = useContext(ScreenSize);

  return screenSize >= 768 ?
    <HeaderTablet deleteBoardDialogRef={deleteBoardDialogRef} setIsNewColumn={setIsNewColumn} selectedBoard={selectedBoard} newTaskDialogRef={newTaskDialogRef} editBoardDialogRef={editBoardDialogRef} />
    :
    <HeaderMobile deleteBoardDialogRef={deleteBoardDialogRef} setIsNewColumn={setIsNewColumn} selectedBoard={selectedBoard} newTaskDialogRef={newTaskDialogRef} newBoardDialogRef={newBoardDialogRef} editBoardDialogRef={editBoardDialogRef} setSelectedBoard={setSelectedBoard} />;
}


function HeaderMobile({ deleteBoardDialogRef, setIsNewColumn, selectedBoard, newTaskDialogRef, newBoardDialogRef, editBoardDialogRef, setSelectedBoard }) {
  const { data } = useContext(Data);
  const [isActive, setIsActive] = useState(false);
  const [isDotActive, setDotActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const toggleDotmenu = () => {
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

  useEffect(() => {
    setIsActive(false)
  }, [selectedBoard])


  function handleEditBoard() {
    setIsNewColumn(false);
    editBoardDialogRef.current.showModal();
  }


  return (
    <>
      {isActive && <div className="overlay" onClick={() => setIsActive(false)}></div>}
      <header className="header-mobile">
        <div className="header-mobile-left">
          <img src="./img/logo.svg" alt="Logo" />
          <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
              {selectedBoard.name}
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
                  <button key={index} className={`header-dropdown-items ${selectedBoard.name === x.name ? "active-board" : ""}`} onClick={() => setSelectedBoard(x)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill={selectedBoard.name === x.name ? "#fff" : "#828FA3"} xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z" />
                    </svg>

                    {x.name}
                  </button>
                ))}
                <button className="header-createNew" onClick={() => newBoardDialogRef.current.showModal()} >
                  <img src="./img/dropdown-purple-logo.svg" alt="Dropdown Logo" /> + Create New Board
                </button>
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
          <button className="header-addNew-button" onClick={() => newTaskDialogRef.current.showModal()}> <img src="./img/plus-icon.svg" alt="" /></button>
          <div className="drop-down-dot">
            <button className="dotBtn" onClick={toggleDotmenu}><img src="./img/dots.svg" alt="" /></button >
            {
              isDotActive && (
                <div className="dot-menu">
                  <button className="editDot" onClick={handleEditBoard}>Edit Board</button>
                  <button className="deleteDot" onClick={() => deleteBoardDialogRef.current.showModal()}>Delete Board</button>
                </div>
              )
            }
          </div>
        </div>
      </header>
    </>
  );
}




function HeaderTablet({ deleteBoardDialogRef, setIsNewColumn, selectedBoard, newTaskDialogRef, editBoardDialogRef }) {
  const [isDotActive, setDotActive] = useState(false);
  const toggleDotmenu = () => {
    setDotActive(!isDotActive)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDotActive && !event.target.closest(".dot-menu-tablet")) {
        setDotActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDotActive]);

  function handleEditBoard() {
    setIsNewColumn(false);
    editBoardDialogRef.current.showModal();
  }

  return (
    <div className="header-tablet">
      <div className="header-tablet-left">
        <div className="side-bar-logo">
          <img src="./img/logo.svg" alt="" />
          <img src="./img/kanban.svg" alt="" />
        </div>
        <div className="header-tablet-logo">
          <h1>{selectedBoard.name}</h1>
        </div>
      </div>
      <div className="header-tablet-right">
        <div className="header-tablet-addnew">
          <button className="header-tabler-addNew-button" onClick={() => newTaskDialogRef.current.showModal()}> +Add New Task</button>
        </div>
        <div className="drop-down-dot">
          <button className="dotBtn" onClick={toggleDotmenu}><img src="./img/dots.svg" alt="" /></button >
          {
            isDotActive && (
              <div className="dot-menu-tablet">
                <button className="editDot" onClick={handleEditBoard}>Edit Board</button>
                <button className="deleteDot" onClick={() => deleteBoardDialogRef.current.showModal()}>Delete Board</button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
