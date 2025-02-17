import "../css/Main.css";

<<<<<<< HEAD
import { useContext, useState, useRef } from "react";
=======
import { Data, ScreenSize } from "../App";
import { useContext, useEffect, useRef, useState } from "react";
>>>>>>> 23bde0ce3d4a8a48cf70146ae1d11a94e39c1c84

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

  // İki farklı modal için iki farklı dialogRef
  const taskDialogRef = useRef(null);
  const boardDialogRef = useRef(null);
  const editTaskDialogRef = useRef(null);
  const editBoardDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);

  const openAddNewTaskModal = () => taskDialogRef.current.showModal();
  const closeAddNewTaskModal= () => taskDialogRef.current.close();

  const openAddNewBoardModal = () => boardDialogRef.current.showModal();
  const closeAddNewBoardModal= () => boardDialogRef.current.close();

  const openEditTaskModal = () => editTaskDialogRef.current.showModal();
  const closeEditTaskModal= () => editTaskDialogRef.current.close();

  const openEditBoardModal = () => editBoardDialogRef.current.showModal();
  const closeEditBoardModal= () => editBoardDialogRef.current.close();

  const openDeleteModal = () => deleteDialogRef.current.showModal();
  const closeDeleteModal = () => deleteDialogRef.current.close();

  return (
    <>
      {/* <Header selectedBoard={selectedBoard} /> */}
      <main>
        <Sidebar selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} />
<<<<<<< HEAD
        <button onClick={openAddNewTaskModal} className="open-modal-btn">Add New Task</button>
        <button onClick={openAddNewBoardModal} className="open-modal-btn">Add New Board</button>
        <button onClick={openEditTaskModal} className="open-modal-btn">Edit Task</button>
        <button onClick={openEditBoardModal} className="open-modal-btn">Edit Board</button>
        <button onClick={openDeleteModal} className="open-modal-btn">Delete Board</button>
        
        <AddNewTask dialogRef={taskDialogRef} closeModal={closeAddNewTaskModal} />
        <AddNewBoard dialogRef={boardDialogRef} closeModal={closeAddNewBoardModal} />
        <EditTask dialogRef={editTaskDialogRef} closeModal={closeEditTaskModal} />
        <EditBoard dialogRef={editBoardDialogRef} closeModal={closeEditBoardModal} />
        <DeleteModal dialogRef={deleteDialogRef} closeModal={closeDeleteModal} />
=======
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
>>>>>>> 23bde0ce3d4a8a48cf70146ae1d11a94e39c1c84
      </main>
      <ViewTaskDialog viewTaskDialogRef={viewTaskDialogRef} task={selectedTask} selectedBoard={selectedBoard} />
    </>
  );
}

<<<<<<< HEAD
// Add New Task Modal
function AddNewTask({ dialogRef, closeModal }) {
  
  return (
    <dialog ref={dialogRef} className="add-new-task-modal">
      <form method="dialog" className="add-new-task-modal-content">
        <h2 className="add-new-task-header">Add New Task</h2>
        <label>
          <p className="add-new-task-title">Title</p>
          <input type="text" placeholder="e.g. Take coffee break" required />
        </label>

        <label>
          <p className="add-new-task-description">Description</p>
          <textarea placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."></textarea>
        </label>

        <label>
          <p className="add-new-task-subtasks">Subtasks</p>
          <div className="add-new-task-first-subtask">
            <input type="text" placeholder="e.g. Make coffee" />
            <img src="/img/cross-icon.svg "/>
          </div>
          <div className="add-new-task-second-subtask">
            <input type="text" placeholder="e.g. Make coffee" />
            <img src="/img/cross-icon.svg "/>
          </div>
        </label>

        <button type="button" className="add-new-subtask-btn">+ Add New Subtask</button>

        <label>
          <p className="add-new-task-status">Status</p>
          <select className="add-new-task-status-options">
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
        
        <button type="submit" className="add-new-task-create-task-btn">Create Task</button>
        <button type="button" onClick={closeModal} className="close-modal-btn">Close</button>
      </form>
    </dialog>
  );
}

// Add New Board Modal
function AddNewBoard({ dialogRef, closeModal }) {
  return (
    <dialog ref={dialogRef} className="add-new-board-modal">
      <form method="dialog" className="add-new-board-modal-content">
        <h2 className="add-new-board-header">Add New Board</h2>
        
        <label>
          <p className="add-new-board-name">Board Name</p>
          <input type="text" placeholder="e.g. Web Design" required />
        </label>

        <label>
          <p className="add-new-board-board-columns">Board Columns</p>
          <div className="first-board-column">
            <input type="text" placeholder="Todo" />
            <img src="/img/cross-icon.svg "/>

          </div>
          <div className="second-board-column">
            <input type="text" placeholder="Doing" />
            <img src="/img/cross-icon.svg "/>

          </div>
          <button type="button" className="add-new-board-add-column-btn">+ Add New Column</button>
        </label>

        <button type="submit" className="add-new-board-create-board-btn">Create New Board</button>
        <button type="button" onClick={closeModal} className="close-modal-btn">Close</button>
      </form>
    </dialog>
  );
}


function EditTask({dialogRef, closeModal}) {
  return (
    <dialog ref={dialogRef} className="add-new-task-modal">
      <form method="dialog" className="add-new-task-modal-content">
        <h2 className="add-new-task-header">Edit Task</h2>
        <label>
          <p className="add-new-task-title">Title</p>
          <input type="text" placeholder="e.g. Take coffee break" required />
        </label>

        <label>
          <p className="add-new-task-description">Description</p>
          <textarea placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."></textarea>
        </label>

        <label>
          <p className="add-new-task-subtasks">Subtasks</p>
          <div className="add-new-task-first-subtask">
            <input type="text" placeholder="e.g. Make coffee" />
            <img src="/img/cross-icon.svg "/>
          </div>
          <div className="add-new-task-second-subtask">
            <input type="text" placeholder="e.g. Make coffee" />
            <img src="/img/cross-icon.svg "/>
          </div>
        </label>

        <button type="button" className="add-new-subtask-btn">+ Add New Subtask</button>

        <label>
          <p className="add-new-task-status">Status</p>
          <select className="add-new-task-status-options">
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
        
        <button type="submit" className="add-new-task-create-task-btn">Create Task</button>
        <button type="button" onClick={closeModal} className="close-modal-btn">Close</button>
      </form>
    </dialog>
  );
}

function EditBoard({dialogRef, closeModal}) {
  return (
    <dialog ref={dialogRef} className="add-new-board-modal">
      <form method="dialog" className="add-new-board-modal-content">
        <h2 className="add-new-board-header">Edit Board</h2>
        
        <label>
          <p className="add-new-board-name">Board Name</p>
          <input type="text" placeholder="e.g. Web Design" required />
        </label>

        <label>
          <p className="add-new-board-board-columns">Board Columns</p>
          <div className="first-board-column">
            <input type="text" placeholder="Todo" />
            <img src="/img/cross-icon.svg "/>

          </div>
          <div className="second-board-column">
            <input type="text" placeholder="Doing" />
            <img src="/img/cross-icon.svg "/>

          </div>
          <button type="button" className="add-new-board-add-column-btn">+ Add New Column</button>
        </label>

        <button type="submit" className="add-new-board-create-board-btn">Create New Board</button>
        <button type="button" onClick={closeModal} className="close-modal-btn">Close</button>
      </form>
    </dialog>
  );
}

function DeleteModal({ dialogRef, closeModal }) {
  return (
    <dialog ref={dialogRef} className="delete-modal">
      <form method="dialog" className="delete-modal-content">
        <h2 className="delete-header">Delete this board?</h2>
        <p className="delete-message">
          Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.
        </p>

        <button type="submit" className="delete-board-btn">Delete</button>
        <button type="button" onClick={closeModal} className="cancel-delete-board-btn">Cancel</button>
      </form>
    </dialog>
  );
}

=======
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

  function handleChangeStatus(newStatus) {
    const thisSelectedBoardColumn = selectedBoard.columns.find(x => x.name === task.status);
    thisSelectedBoardColumn.tasks = thisSelectedBoardColumn.tasks.filter(x => x.id !== task.id);
    task.status = newStatus;
    const newSelectedBoardColumn = selectedBoard.columns.find(x => x.name === newStatus);
    newSelectedBoardColumn.tasks.push(task);
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
>>>>>>> 23bde0ce3d4a8a48cf70146ae1d11a94e39c1c84
