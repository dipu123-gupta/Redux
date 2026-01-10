import React, { useState } from "react";
import "./todo.css";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { addTask, deleteTask, fetchTask } from "./Store";

export const Todo = () => {
  const [task, setTask] = useState([]);
  const tasks = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const handalFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    return setTask("");
  };

  const handalDelet = (id) => {
    return dispatch(deleteTask(id));
  };
  // console.log("react states", tasks.task);

  const handalFetchTasks=()=>{
    return dispatch(fetchTask());
  }

  return (
    <div className="container">
      <div className="todo-app">
        <h1>
          <i className="fa-regular fa-pen-to-square"></i> To-do list
        </h1>

        <div className="row">
          <form onSubmit={handalFormSubmit}>
            <input
              type="text"
              id="input-box"
              placeholder="Add a new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button>Add Task</button>
          </form>
        </div>
        <button onClick={handalFetchTasks}>Fetch Task</button>

        <ul id="list-container">
          {tasks.map((currentTask, index) => {
            return (
              <li key={index}>
                <p>
                  {index}:{currentTask}
                </p>
                <div>
                  <MdDeleteForever onClick={()=>handalDelet(index)} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
