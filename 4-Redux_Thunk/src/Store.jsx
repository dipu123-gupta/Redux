import React from "react";
import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";


// ! Define Action types: stateDomain & the Event
const ADD_TASK = "task/add";
const DETETE_TASK = "task/delete";
const FETCH_TASKS = "task/fetch";

const initialState = {
  isLoading: false,
  task: [],
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case DETETE_TASK:
      return {
        ...state,
        task: state.task.filter((_, index) => index !== action.payload),
      };

    case FETCH_TASKS:
      return {
        ...state,
        task: [...state.task,...action.payload], // ✅ FIX
      };

    default:
      return state;
  }
};


// ! step 2: Create the Redux Store using the reducer
export const Store = createStore(
  taskReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
console.log(Store);

console.log("initial State: ", Store.getState());

// ! Step 5: Create action createStors
export const addTask = (data) => {
  return { type: ADD_TASK, payload: data };
};
Store.dispatch(addTask("Buy apple"));

export const deleteTask = (id) => {
  return { type: DETETE_TASK, payload: id };
};

Store.dispatch(deleteTask(0));

export const fetchTask = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      );
      const task = await res.json();
      dispatch({ type: FETCH_TASKS, payload: task.map((currentTask)=>currentTask.title) });
    } catch (error) {
      console.log(error);
    }
  };
};
// Store.dispatch(fetchTask())