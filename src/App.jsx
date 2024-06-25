import "./App.css";
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './todolist';
import AddTodoForm from './addtodoform'; // Import the new component

function App() {
  const [count, setCount] = useState(0);

  // Return JSX with the TodoList and AddTodoForm components
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm /> {/* Add the new component here */}
      <TodoList />
    </>
  );
}

export default App;
