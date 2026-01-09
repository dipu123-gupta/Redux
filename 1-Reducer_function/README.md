# Redux & Redux Toolkit – Complete State Management Guide 🚀

Redux is a **predictable state management library** mainly used with **React** applications.  
It helps manage **global state** in large-scale applications where data needs to be shared across multiple components.

---

## 📌 Table of Contents

1. What is Redux?
2. Why Redux is Needed
3. Problems Without Redux
4. Redux Architecture
5. Core Principles of Redux
6. Redux Core Concepts (Store, Action, Reducer)
7. Redux Data Flow
8. Redux Toolkit (Modern Redux)
9. Folder Structure
10. Redux with React (Step-by-Step)
11. Redux vs Context API
12. Redux vs useState
13. When to Use Redux
14. Best Practices
15. Common Interview Questions
16. Conclusion

---

## 1️⃣ What is Redux?

Redux is a **JavaScript library** for managing and centralizing application state.  
It follows **Flux architecture** and enforces **one-way data flow**.

> Redux does NOT depend on React – it can be used with Angular, Vue, or Vanilla JS.

---

## 2️⃣ Why Redux is Needed?

As applications grow:
- State becomes scattered across components
- Props drilling increases
- Debugging becomes difficult
- Data inconsistency occurs

Redux solves this by:
- Providing a **single source of truth**
- Making state changes **predictable**
- Enabling **time-travel debugging**

---

## 3️⃣ Problems Without Redux

❌ Props drilling  
❌ Duplicate states  
❌ Hard to debug bugs  
❌ Unstructured state updates  

Example:
```txt
App
 └── Dashboard
     └── Sidebar
         └── Profile
             └── UserInfo

Passing props through every level is inefficient.

4️⃣ Redux Architecture

Redux follows unidirectional data flow:

UI → Action → Reducer → Store → UI

5️⃣ Core Principles of Redux
1. Single Source of Truth

The entire app state is stored in one store.

2. State is Read-Only

State can only be changed using actions.

3. Changes via Pure Functions

Reducers are pure functions.

6️⃣ Redux Core Concepts
🔹 Store

Holds the complete application state

Created using configureStore()

{
  auth: { user: null, token: null },
  cart: { items: [] },
  theme: "light"
}

🔹 Action

Plain JavaScript object

Must have a type property

{
  type: "cart/addItem",
  payload: { id: 1, name: "Laptop" }
}

🔹 Reducer

Takes (state, action)

Returns new state

Must be pure

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    default:
      return state;
  }
};

🔹 Dispatch

Sends action to the store

dispatch({ type: "ADD_ITEM", payload: product });

7️⃣ Redux Data Flow (Detailed)

User clicks a button

Component dispatches an action

Reducer receives action

Reducer updates state

Store saves updated state

React re-renders UI

✔ Predictable
✔ Debuggable
✔ Scalable

8️⃣ Redux Toolkit (RTK) – Modern Redux

Redux Toolkit is the official recommended approach.

Why RTK?

Less boilerplate

Built-in Immer

Built-in DevTools

Simplified async handling

Installation
npm install @reduxjs/toolkit react-redux

9️⃣ Folder Structure
src/
 ├── app/
 │    └── store.js
 ├── features/
 │    ├── auth/
 │    │    └── authSlice.js
 │    ├── cart/
 │    │    └── cartSlice.js
 ├── components/
 └── App.jsx

🔟 Redux with React (Step-by-Step)
Create Slice
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

Create Store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

Provide Store
import { Provider } from "react-redux";
import { store } from "./app/store";

<Provider store={store}>
  <App />
</Provider>

Use in Component
import { useSelector, useDispatch } from "react-redux";
import { login } from "./features/auth/authSlice";

const Login = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(login({ name: "Dipu" }))}>
      Login
    </button>
  );
};

1️⃣1️⃣ Redux vs Context API
Feature	Redux	Context API
Performance	High	Medium
Debugging	Excellent	Limited
Async	Easy	Complex
Boilerplate	Medium	Low
1️⃣2️⃣ Redux vs useState
useState	Redux
Local state	Global state
Simple logic	Complex logic
Small apps	Large apps
1️⃣3️⃣ When to Use Redux?

✅ Authentication
✅ Cart / Orders
✅ Theme / Language
✅ Real-time dashboards

❌ Small projects
❌ Static UI