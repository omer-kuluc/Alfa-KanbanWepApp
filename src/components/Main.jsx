import "../css/Main.css";

import { Data, ScreenSize } from "../App";
import { useContext, useEffect, useRef, useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Main() {
  const { data } = useContext(Data);
  const viewTaskDialogRef = useRef(null);
  const [selectedBoard, setSelectedBoard] = useState(data[0]);
  const [selectedTask, setSelectedTask] = useState(null);
  const columnGroupStyle = {
    gridTemplateColumns: `repeat(${selectedBoard.columns.length + 1}, ${selectedBoard.columns.length > 0 ? "280px" : "100%"})`,
  };

  function handleTaskClick(task) {
    setSelectedTask(task);
    viewTaskDialogRef.current.showModal();
  }

  return (
    <>
      {/* <Header selectedBoard={selectedBoard} /> */}
      <main>
        <Sidebar selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} />
        <div className="main-grid-column-group" style={columnGroupStyle}>
          {selectedBoard.columns.length > 0 ? (
            <>
              {selectedBoard.columns.map((column) => (
                <div key={column.id} className="main-grid-column-item">
                  <h2 className="main-grid-column-title">
                    {column.name} ({column.tasks.length})
                  </h2>
                  <ul className="main-grid-column-item-list">
                    {column.tasks.map((task) => (
                      <li key={task.id} className="main-grid-column-item-list-item" onClick={() => handleTaskClick(task)}>
                        <h2>{task.title}</h2>
                        <p>
                          {task.subtasks.filter((x) => x.isCompleted).length} of {task.subtasks.length} substasks
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="main-grid-column-new-column">
                <h1>+ New Column</h1>
              </div>
            </>
          ) : (
            <div className="main-grid-column-empty-state">
              <h2 className="main-grid-column-empty-state-text">This board is empty. Create a new column to get started.</h2>
              <button className="main-grid-column-empty-state-button">+ Add New Column</button>
            </div>
          )}
        </div>
      </main>
      <ViewTaskDialog viewTaskDialogRef={viewTaskDialogRef} task={selectedTask} selectedBoard={selectedBoard} />
    </>
  );
}

function ViewTaskDialog({ viewTaskDialogRef, task, selectedBoard }) {
  const dropDownButtonRef = useRef(null);
  const { data, setData } = useContext(Data);
  const screenSize = useContext(ScreenSize);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [dropdownMenuPosition, setDropdownMenuPosition] = useState({ left: 0, top: 0, right: 0 });

  function handleSubTask(i) {
    task.subtasks[i].isCompleted = !task.subtasks[i].isCompleted;
    setData([...data]);
  }

  useEffect(() => {
    setDropdownMenu(false);
  }, [task]);

  useEffect(() => {
    setDropdownMenuPosition({
      left: dropDownButtonRef.current.getBoundingClientRect().left,
      top: dropDownButtonRef.current.getBoundingClientRect().bottom + 16,
      right: screenSize - dropDownButtonRef.current.getBoundingClientRect().right,
    });
  }, [dropdownMenu, screenSize, task]);

  function handleChangeStatus(status) {
    task.status = status;
    setData([...data]);
  }

  return (
    <dialog ref={viewTaskDialogRef} className="view-task-dialog" onClick={() => viewTaskDialogRef.current.close()}>
      <div className="view-task-contents" onClick={(e) => e.stopPropagation()}>
        <h2>{task?.title}</h2>
        <p>{task?.description}</p>
        <div className="view-task-subtask-contents">
          <h4>
            Subtasks ({task?.subtasks.filter((x) => x.isCompleted).length} of {task?.subtasks.length})
          </h4>
          <ul>
            {task?.subtasks.map((subtask, i) => (
              <li key={i} className={subtask.isCompleted ? "completed" : ""}>
                <label>
                  {subtask.title}
                  <input type="checkbox" checked={subtask.isCompleted} onChange={() => handleSubTask(i)} />
                  <span className="checkmark"></span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="view-task-current-status-contents">
          <h4>Current Status</h4>
          <button ref={dropDownButtonRef} onClick={() => setDropdownMenu(!dropdownMenu)}>
            {task?.status}
            <img src="/img/bottom-arrow.svg" />
          </button>
          {dropdownMenu && (
            <div className="view-task-current-status-dropdown-contents" style={dropdownMenuPosition}>
              {selectedBoard.columns.map((column) => (
                <button key={column.id} onClick={() => handleChangeStatus(column.name)}>
                  {column.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
