import React from "react";
import { createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
const ADD_TASK = "task/add";
const DETETE_TASK = "task/delete";

const initialState = {
  isLoding: false,
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
      const updatedTask = state.task.filter((currentTask, index) => {
        return index !== action.payload;
      });
      return {
        ...state,
        task: updatedTask,
      };

    default:
      return state;
  }
};

// ! step 2: Create the Redux Store using the reducer
export const Store = createStore(taskReducer,composeWithDevTools);
console.log(Store);

console.log("initial State: ", Store.getState());

// ! Step 5: Create action createStors
export const addTask=(data)=>{
 return {type:ADD_TASK,payload:data}
}
Store.dispatch(addTask("Buy apple"));


console.log("Updated Store :",Store.getState());

export const deleteTask=(id)=>{
  return {type:DETETE_TASK,payload:id}
}

Store.dispatch(deleteTask(0));
console.log("Updated Store :",Store.getState());