import "./App.css";
import { useState } from 'react';
import TodoList from './todolist';
import addtodoform from './addtodoform';

function App() {
  const [newTodo, setNewTodo] = useState('');

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>New Todo: {newTodo}</p>
    </div>
  );
}

export default App;