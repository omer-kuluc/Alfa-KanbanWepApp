import "../css/Main.css";

import { useContext, useState, useRef } from "react";

import { Data } from "../App";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Main() {
  const { data, setData } = useContext(Data);
  const [selectedBoard, setSelectedBoard] = useState(data[0].name);

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
      <Header selectedBoard={selectedBoard} />
      <main>
        <Sidebar selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} />
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
      </main>
    </>
  );
}

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

