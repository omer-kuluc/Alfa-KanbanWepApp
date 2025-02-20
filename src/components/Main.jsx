import "../css/Main.css";

import { Data, ScreenSize } from "../App";
import { useContext, useEffect, useRef, useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";

export default function Main() {
  const { data } = useContext(Data);
  const screenSize = useContext(ScreenSize);
  const viewTaskDialogRef = useRef(null);
  const taskDialogRef = useRef(null);
  const boardDialogRef = useRef(null);
  const editTaskDialogRef = useRef(null);
  const editBoardDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);
  const deleteBoardDialogRef = useRef(null);
  const [selectedBoard, setSelectedBoard] = useState(data[0]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isNewColumn, setIsNewColumn] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    window.addEventListener("resize", () => setScreenHeight(window.innerHeight));
  }, []);

  useEffect(() => {
    screenSize < 768 && setIsSidebarHidden(true);
  }, [screenSize]);

  const columnGroupStyle = {
    gridTemplateColumns: `repeat(${selectedBoard.columns.length + (selectedBoard.columns.length !== 6 ? 1 : 0)}, ${selectedBoard.columns.length > 0 ? "280px" : "100%"})`,
  };

  function handleTaskClick(task) {
    setSelectedTask(task);
    viewTaskDialogRef.current.showModal();
  }

  function handleNewColumn() {
    setIsNewColumn(true);
    editBoardDialogRef.current.showModal();
  }

  return (
    <>
      <Header deleteBoardDialogRef={deleteBoardDialogRef} setIsNewColumn={setIsNewColumn} selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} newTaskDialogRef={taskDialogRef} newBoardDialogRef={boardDialogRef} editBoardDialogRef={editBoardDialogRef} darkMode={darkMode} setDarkMode={setDarkMode} />
      {screenSize > 768 && <Sidebar selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} isHidden={isSidebarHidden} setHidden={setIsSidebarHidden} newBoardDialogRef={boardDialogRef} darkMode={darkMode} setDarkMode={setDarkMode} />}
      <div className={`app-container ${isSidebarHidden ? "sidebar-hidden" : ""}`}>
        <main className={darkMode ? "dark-mode-main" : ""}>
          {selectedBoard.columns.length > 0 ? (
            <div className={darkMode ? "main-grid-column-group-dark" : "main-grid-column-group"} style={columnGroupStyle}>
              {selectedBoard.columns.map((column) => (
                <div key={column.id} className="main-grid-column-item">
                  <h2 className="main-grid-column-title">
                    {column.name} ({column.tasks.length})
                  </h2>
                  <ul className="main-grid-column-item-list" style={column.tasks.length === 0 ? { outline: "1px dashed #828fa3", outlineWidth: 2, borderRadius: 6 } : {}}>
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
              {selectedBoard.columns.length < 6 && (
                <div className="main-grid-column-new-column" onClick={handleNewColumn}>
                  <button>+ New Column</button>
                </div>
              )}
            </div>
          ) : (
            <div className="main-grid-column-empty-state">
              <h2 className="main-grid-column-empty-state-text">This board is empty. Create a new column to get started.</h2>
              <button className="main-grid-column-empty-state-button" onClick={handleNewColumn}>
                + Add New Column
              </button>
            </div>
          )}
        </main>
      </div>
      <AddNewTask dialogRef={taskDialogRef} selectedBoard={selectedBoard} screenHeight={screenHeight} darkMode={darkMode} setDarkMode={setDarkMode} />
      <AddNewBoard dialogRef={boardDialogRef} setSelectedBoard={setSelectedBoard} darkMode={darkMode} />
      <EditTask dialogRef={editTaskDialogRef} task={selectedTask} selectedBoard={selectedBoard} viewTaskDialogRef={viewTaskDialogRef} screenHeight={screenHeight} darkMode={darkMode} />
      <EditBoard isNewColumn={isNewColumn} dialogRef={editBoardDialogRef} selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} darkMode={darkMode} />
      <DeleteModal dialogRef={deleteDialogRef} viewTaskDialogRef={viewTaskDialogRef} task={selectedTask} selectedBoard={selectedBoard} darkMode={darkMode} />
      <DeleteBoardModal dialogRef={deleteBoardDialogRef} selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} darkMode={darkMode} />
      <ViewTaskDialog viewTaskDialogRef={viewTaskDialogRef} task={selectedTask} selectedBoard={selectedBoard} deleteDialogRef={deleteDialogRef} editTaskDialogRef={editTaskDialogRef} screenHeight={screenHeight} darkMode={darkMode} />
    </>
  );
}

function ViewTaskDialog({ viewTaskDialogRef, task, selectedBoard, deleteDialogRef, editTaskDialogRef, screenHeight, darkMode }) {
  const dropDownButtonRef = useRef(null);
  const dotDropDownButtonRef = useRef(null);
  const { data, setData } = useContext(Data);
  const screenSize = useContext(ScreenSize);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [dotDropdownMenu, setDotDropdownMenu] = useState(false);
  const [dropdownMenuPosition, setDropdownMenuPosition] = useState({ left: 0, top: 0, right: 0 });
  const [dotDropdownMenuPosition, setDotDropdownMenuPosition] = useState({ left: 0, top: 0, right: 0 });

  function handleSubTask(i) {
    task.subtasks[i].isCompleted = !task.subtasks[i].isCompleted;
    setData([...data]);
    toast.success("Subtask status changed successfully.");
  }

  useEffect(() => {
    setDropdownMenu(false);
    setDotDropdownMenu(false);
  }, [task]);

  useEffect(() => {
    setDropdownMenuPosition({
      left: dropDownButtonRef.current.getBoundingClientRect().left,
      top: dropDownButtonRef.current.getBoundingClientRect().bottom + 16,
      right: screenSize - dropDownButtonRef.current.getBoundingClientRect().right,
    });

    setDotDropdownMenuPosition({
      left: dotDropDownButtonRef.current.getBoundingClientRect().left - 96,
      top: dotDropDownButtonRef.current.getBoundingClientRect().bottom + 16,
      right: screenSize < 768 ? 0 : screenSize - dotDropDownButtonRef.current.getBoundingClientRect().right - 64,
    });
  }, [dropdownMenu, screenSize, task, dotDropdownMenu, screenHeight]);

  function handleChangeStatus(newStatus) {
    const thisSelectedBoardColumn = selectedBoard.columns.find((x) => x.id === task.statusId);
    thisSelectedBoardColumn.tasks = thisSelectedBoardColumn.tasks.filter((x) => x.id !== task.id);
    task.status = newStatus;
    const newSelectedBoardColumn = selectedBoard.columns.find((x) => x.name === newStatus);
    task.statusId = newSelectedBoardColumn.id;
    newSelectedBoardColumn.tasks.push(task);
    setData([...data]);
    setDropdownMenu(false);
    toast.success("Task status changed successfully.");
  }

  function handleCloseModal() {
    viewTaskDialogRef.current.close();
    setDropdownMenu(false);
    setDotDropdownMenu(false);
  }

  return (
    <dialog ref={viewTaskDialogRef} className={darkMode ? "view-task-dialog dark" : "view-task-dialog"} onClick={handleCloseModal}>
      <div className="view-task-contents" onClick={(e) => e.stopPropagation()}>
        <div className="view-task-contents-header">
          <h2>{task?.title}</h2>
          <button ref={dotDropDownButtonRef} onClick={() => setDotDropdownMenu(!dotDropdownMenu)}>
            <img src="/img/dots.svg" />
          </button>
          {dotDropdownMenu && (
            <div className="view-task-contents-interactions" style={dotDropdownMenuPosition}>
              <button onClick={() => editTaskDialogRef.current.showModal()}>Edit Task</button>
              <button onClick={() => deleteDialogRef.current.showModal()}>Delete Task</button>
            </div>
          )}
        </div>
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

// Add New Task Modal
function AddNewTask({ dialogRef, selectedBoard, screenHeight, darkMode, setDarkMode }) {
  const formRef = useRef(null);
  const { data, setData } = useContext(Data);
  const screenSize = useContext(ScreenSize);
  const dropDownButtonRef = useRef(null);
  const [subtasks, setSubtasks] = useState([{ title: "", isCompleted: false }]);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(selectedBoard.columns[0]?.name);
  const [dropdownMenuPosition, setDropdownMenuPosition] = useState({ left: 0, top: 0, right: 0 });

  useEffect(() => {
    setCurrentStatus(selectedBoard.columns[0]?.name);
  }, [selectedBoard, data]);

  useEffect(() => {
    setDropdownMenuPosition({
      left: dropDownButtonRef.current.getBoundingClientRect().left,
      top: dropDownButtonRef.current.getBoundingClientRect().bottom + 16,
      right: screenSize - dropDownButtonRef.current.getBoundingClientRect().right,
    });
  }, [screenSize, dropdownMenu, screenHeight]);

  function handleSubmit(e) {
    const formData = new FormData(e.target);
    const formObje = Object.fromEntries(formData);
    if (selectedBoard.columns.length === 0) {
      return toast.error("You need to create a column first.");
    }
    const filteredSubtasks = subtasks.filter((x) => x.title.trim() !== "");
    const foundedColumn = selectedBoard.columns.find((x) => x.name === currentStatus);
    const newTaskObj = {
      id: crypto.randomUUID(),
      title: formObje.title,
      description: formObje.description,
      status: currentStatus,
      statusId: foundedColumn.id,
      subtasks: filteredSubtasks,
    };
    foundedColumn.tasks.push(newTaskObj);
    setData([...data]);
    e.target.reset();
    setSubtasks([{ title: "", isCompleted: false }]);
    toast.success("Task created successfully.");
  }

  function handleChangeSubtasks(e, i) {
    subtasks[i].title = e.target.value;
    setSubtasks([...subtasks]);
  }

  function handleRemoveSubtasks(i) {
    if (subtasks.length > 1) {
      setSubtasks(subtasks.filter((_, index) => index !== i));
    }
  }

  function handleChangeStatus(selectedStatus) {
    setCurrentStatus(selectedStatus);
    setTimeout(() => setDropdownMenu(false), 100);
  }

  function handleReset() {
    dialogRef.current.close();
    setSubtasks([{ title: "", isCompleted: false }]);
    setCurrentStatus(selectedBoard.columns[0]?.name);
    formRef.current.reset();
  }

  return (
    <dialog ref={dialogRef} className={darkMode ? "add-new-task-modal dark" : "add-new-task-modal"} onClick={handleReset}>
      <form ref={formRef} onSubmit={handleSubmit} method="dialog" className="add-new-task-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="add-new-task-header">Add New Task</h2>
        <label>
          <p className="add-new-task-title">Title</p>
          <input name="title" type="text" placeholder="e.g. Take coffee break" required />
        </label>

        <label>
          <p className="add-new-task-description">Description</p>
          <textarea name="description" placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." rows={4}></textarea>
        </label>

        <label>
          <p className="add-new-task-subtasks">Subtasks</p>
          <div className="columns-group">
            {subtasks?.map((subtask, i) => (
              <div key={i} className="add-new-task-first-subtask">
                <input type="text" placeholder="e.g. Make coffee" value={subtask.title} onChange={(e) => handleChangeSubtasks(e, i)} />
                <button type="button" onClick={() => handleRemoveSubtasks(i)}>
                  <img src="/img/cross-icon.svg " />
                </button>
              </div>
            ))}
          </div>
        </label>

        <button type="button" className="add-new-subtask-btn" onClick={() => setSubtasks([...subtasks, { title: "", isCompleted: false }])}>
          + Add New Subtask
        </button>

        <label>
          <p className="add-new-task-status">Status</p>
          <button className="main-drop-down-btn" type="button" disabled={selectedBoard.columns.length === 0} ref={dropDownButtonRef} onClick={() => setDropdownMenu(!dropdownMenu)}>
            {selectedBoard.columns.length > 0 ? currentStatus : "-"}
            <img src="/img/bottom-arrow.svg" />
          </button>
          {dropdownMenu && (
            <div className="view-task-current-status-dropdown-contents" style={dropdownMenuPosition}>
              {selectedBoard.columns.map((column) => (
                <button type="button" key={column.id} onClick={() => handleChangeStatus(column.name)}>
                  {column.name}
                </button>
              ))}
            </div>
          )}
        </label>

        <button type="submit" className="add-new-task-create-task-btn">
          Save Changes
        </button>
      </form>
    </dialog>
  );
}

// Add New Board Modal
function AddNewBoard({ dialogRef, setSelectedBoard, darkMode }) {
  const { data, setData } = useContext(Data);
  const [columns, setColumns] = useState([
    {
      id: crypto.randomUUID(),
      name: "",
      tasks: [],
    },
  ]);

  function handleAddColumn() {
    if (columns.length < 6) {
      setColumns([
        ...columns,
        {
          id: crypto.randomUUID(),
          name: "",
          tasks: [],
        },
      ]);
    }
  }

  function handleSubmit(e) {
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const filteredColumns = columns.filter((x) => x.name.trim() !== "");
    const newBoardObj = {
      id: crypto.randomUUID(),
      name: formObj.name,
      columns: filteredColumns,
    };
    setData([...data, newBoardObj]);
    e.target.reset();
    setColumns([
      {
        id: crypto.randomUUID(),
        name: "",
        tasks: [],
      },
    ]);
    setSelectedBoard(newBoardObj);
    toast.success("Board created successfully.");
  }

  function handleChangeColumns(e, i) {
    columns[i].name = e.target.value;
    setColumns([...columns]);
  }

  return (
    <dialog ref={dialogRef} className={darkMode ? "add-new-board-modal dark" : "add-new-board-modal"} onClick={() => dialogRef.current.close()}>
      <form method="dialog" className="add-new-board-modal-content" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2 className="add-new-board-header">Add New Board</h2>

        <label>
          <p className="add-new-board-name">Board Name</p>
          <input type="text" placeholder="e.g. Web Design" required defaultValue={"My Board"} name="name" />
        </label>

        <label>
          <p className="add-new-board-board-columns">Board Columns</p>
          <div className="columns-group">
            {columns.map((x, i) => (
              <div className="first-board-column" key={x.id}>
                <input type="text" placeholder="Todo" value={x.name} onChange={(e) => handleChangeColumns(e, i)} />
                <button onClick={() => setColumns(columns.filter((y) => y.id !== x.id))}>
                  <img src="/img/cross-icon.svg " />
                </button>
              </div>
            ))}
          </div>
          {columns.length < 6 && (
            <button type="button" className="add-new-board-add-column-btn" onClick={handleAddColumn}>
              + Add New Column
            </button>
          )}
        </label>

        <button type="submit" className="add-new-board-create-board-btn">
          Create New Board
        </button>
      </form>
    </dialog>
  );
}

function EditTask({ dialogRef, task, selectedBoard, viewTaskDialogRef, screenHeight, darkMode }) {
  const { data, setData } = useContext(Data);
  const screenSize = useContext(ScreenSize);
  const dropDownButtonRef = useRef(null);

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(task?.status);
  const [dropdownMenuPosition, setDropdownMenuPosition] = useState({ left: 0, top: 0, right: 0 });
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);

  useEffect(() => {
    setDropdownMenuPosition({
      left: dropDownButtonRef.current.getBoundingClientRect().left,
      top: dropDownButtonRef.current.getBoundingClientRect().bottom + 16,
      right: screenSize - dropDownButtonRef.current.getBoundingClientRect().right,
    });
  }, [task, screenSize, dropdownMenu, screenHeight]);

  useEffect(() => {
    setSubtasks(task?.subtasks || []);
    setCurrentStatus(task?.status);
  }, [task]);

  function handleRemoveSubtasks(i) {
    setSubtasks(subtasks.filter((_, index) => index !== i));
  }

  function handleChangeSubtasks(e, i) {
    subtasks[i].title = e.target.value;
    setSubtasks([...subtasks]);
  }

  function handleSubmit(e) {
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const newStatusId = selectedBoard.columns.find((x) => x.name === currentStatus).id;
    const filteredSubtasks = subtasks.filter((x) => x.title.trim() !== "");
    const newTaskObj = {
      id: task.id,
      title: formObj.title,
      description: formObj.description,
      status: currentStatus,
      statusId: newStatusId,
      subtasks: filteredSubtasks,
    };
    const thisColumn = selectedBoard.columns.find((x) => x.id === task.statusId);

    if (newStatusId !== task.statusId) {
      thisColumn.tasks = thisColumn.tasks.filter((x) => x.id !== task.id);
      const newColumn = selectedBoard.columns.find((x) => x.name === currentStatus);
      newColumn.tasks.push(newTaskObj);
    } else {
      thisColumn.tasks[thisColumn.tasks.findIndex((x) => x.id === task.id)] = newTaskObj;
    }

    setData([...data]);
    viewTaskDialogRef.current.close();
    toast.success("Task updated successfully.");
  }

  function handleChangeStatus(newStatus) {
    setCurrentStatus(newStatus);
    setTimeout(() => setDropdownMenu(false), 100);
  }

  return (
    <dialog ref={dialogRef} className={darkMode ? "add-new-task-modal dark" : "add-new-task-modal"} onClick={() => dialogRef.current.close()}>
      <form onSubmit={handleSubmit} method="dialog" className="add-new-task-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="add-new-task-header">Edit Task</h2>
        <label>
          <p className="add-new-task-title">Title</p>
          <input name="title" type="text" placeholder="e.g. Take coffee break" required defaultValue={task?.title} />
        </label>

        <label>
          <p className="add-new-task-description">Description</p>
          <textarea rows={4} name="description" defaultValue={task?.description} placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."></textarea>
        </label>

        <label>
          <p className="add-new-task-subtasks">Subtasks</p>
          <div className="columns-group">
            {subtasks?.map((subtask, i) => (
              <div key={i} className="add-new-task-first-subtask">
                <input type="text" placeholder="e.g. Make coffee" value={subtask.title} onChange={(e) => handleChangeSubtasks(e, i)} />
                <button type="button" onClick={() => handleRemoveSubtasks(i)}>
                  <img src="/img/cross-icon.svg " />
                </button>
              </div>
            ))}
          </div>
        </label>

        <button type="button" className="add-new-subtask-btn" onClick={() => setSubtasks([...subtasks, { title: "", isCompleted: false }])}>
          + Add New Subtask
        </button>

        <label>
          <p className="add-new-task-status">Status</p>
          <button className="main-drop-down-btn" type="button" ref={dropDownButtonRef} onClick={() => setDropdownMenu(!dropdownMenu)}>
            {currentStatus}
            <img src="/img/bottom-arrow.svg" />
          </button>
          {dropdownMenu && (
            <div className="view-task-current-status-dropdown-contents" style={dropdownMenuPosition}>
              {selectedBoard.columns.map((column) => (
                <button type="button" key={column.id} onClick={() => handleChangeStatus(column.name)}>
                  {column.name}
                </button>
              ))}
            </div>
          )}
        </label>

        <button type="submit" className="add-new-task-create-task-btn">
          Save Changes
        </button>
      </form>
    </dialog>
  );
}

function EditBoard({ isNewColumn, dialogRef, selectedBoard, darkMode }) {
  const formRef = useRef(null);
  const { data, setData } = useContext(Data);
  const [edittingBoard, setEdittingBoard] = useState(structuredClone(selectedBoard));

  useEffect(() => {
    setEdittingBoard(structuredClone(selectedBoard));
  }, [selectedBoard]);

  function handleColumnChange(e, index) {
    edittingBoard.columns[index].name = e.target.value;
    edittingBoard.columns[index].tasks.map((x) => (x.status = e.target.value));
    setEdittingBoard(structuredClone(edittingBoard));
  }

  function handleAddNewColumn() {
    const newColumnObj = {
      id: crypto.randomUUID(),
      name: "",
      tasks: [],
    };
    if (edittingBoard.columns.length < 6) {
      edittingBoard.columns.push(newColumnObj);
      setEdittingBoard(structuredClone(edittingBoard));
    }
  }

  function handleRemoveColumn(id) {
    if (edittingBoard.columns.find((x) => x.id === id).tasks.length > 0) {
      return toast.error("You can't remove a column that has tasks in it.");
    }
    if (edittingBoard.columns.length > 1) {
      edittingBoard.columns = edittingBoard.columns.filter((x) => x.id !== id);
    } else {
      edittingBoard.columns[0] = {
        id: crypto.randomUUID(),
        name: "",
        tasks: [],
      };
    }
    setEdittingBoard(structuredClone(edittingBoard));
  }

  function handleSubmit() {
    edittingBoard.columns = edittingBoard.columns.filter((x) => x.name.trim() !== "");
    selectedBoard.name = edittingBoard.name;
    selectedBoard.columns = edittingBoard.columns;
    setData([...data]);
    toast.success("Board updated successfully.");
  }

  function handleReset() {
    setEdittingBoard(structuredClone(selectedBoard));
    dialogRef.current.close();
    formRef.current.reset();
  }

  return (
    <dialog ref={dialogRef} className={darkMode ? "add-new-board-modal dark" : "add-new-board-modal"} onClick={handleReset}>
      <form ref={formRef} onSubmit={handleSubmit} method="dialog" className="add-new-board-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="add-new-board-header">{isNewColumn ? "Add New Column" : "Edit Board"}</h2>
        <label>
          <p className="add-new-board-name">Board Name</p>
          <input disabled={isNewColumn} type="text" placeholder="e.g. Web Design" required value={edittingBoard.name} onChange={(e) => setEdittingBoard({ ...edittingBoard, name: e.target.value })} />
        </label>

        <label>
          <p className="add-new-board-board-columns">Board Columns</p>
          <div className="columns-group">
            {edittingBoard.columns.map((column, i) => (
              <div className="first-board-column" key={column.id}>
                <input type="text" placeholder="Todo" value={column.name} onChange={(e) => handleColumnChange(e, i)} />
                <button type="button" onClick={() => handleRemoveColumn(column.id)}>
                  <img src="/img/cross-icon.svg" />
                </button>
              </div>
            ))}
          </div>
          {edittingBoard.columns.length < 6 && (
            <button type="button" className="add-new-board-add-column-btn" onClick={handleAddNewColumn}>
              + Add New Column
            </button>
          )}
        </label>

        <button type="submit" className="add-new-board-create-board-btn">
          Save Changes
        </button>
      </form>
    </dialog>
  );
}

function DeleteModal({ dialogRef, viewTaskDialogRef, closeModal, task, selectedBoard, darkMode }) {
  const { data, setData } = useContext(Data);

  function handleConfirmDelete() {
    const thisSelectedBoardColumn = selectedBoard.columns.find((x) => x.name === task.status);
    thisSelectedBoardColumn.tasks = thisSelectedBoardColumn.tasks.filter((x) => x.id !== task.id);
    setData([...data]);
    viewTaskDialogRef.current.close();
    toast.success("Task deleted successfully.");
  }

  return (
    <dialog ref={dialogRef} className={darkMode ? "delete-modal dark" : "delete-modal"} onClick={() => dialogRef.current.close()}>
      <form method="dialog" className={darkMode ? "delete-modal-content dark" : "delete-modal-content"} onClick={(e) => e.stopPropagation()}>
        <h2 className="delete-header">Delete this task?</h2>
        <p className="delete-message">Are you sure you want to delete the ‘{task?.title}’ task and its subtasks? This action cannot be reversed.</p>
        <div className="deleteModal-btns-group">
          <button type="submit" className="delete-board-btn" onClick={handleConfirmDelete}>
            Delete
          </button>
          <button type="button" onClick={() => dialogRef.current.close()} className="cancel-delete-board-btn">
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}

function DeleteBoardModal({ dialogRef, selectedBoard, setSelectedBoard, darkMode }) {
  const { data, setData } = useContext(Data);

  function handleConfirmDelete() {
    setData((prev) => {
      const newData = prev.filter((x) => x.id !== selectedBoard.id);
      if (newData.length === 0) {
        newData.push({
          id: crypto.randomUUID(),
          name: "My Board",
          columns: [],
        });
      }
      setSelectedBoard(newData[0]);
      return newData;
    });
    toast.success("Board deleted successfully.");
  }

  return (
    <dialog ref={dialogRef} className={darkMode ? "delete-modal dark" : "delete-modal"} onClick={() => dialogRef.current.close()}>
      <form method="dialog" className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="delete-header">Delete this board?</h2>
        <p className="delete-message">Are you sure you want to delete the ‘{selectedBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="deleteModal-btns-group">
          <button type="submit" className="delete-board-btn" onClick={handleConfirmDelete}>
            Delete
          </button>
          <button type="button" onClick={() => dialogRef.current.close()} className="cancel-delete-board-btn">
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
