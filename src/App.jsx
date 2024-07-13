import "./App.css";
import { useState } from 'react';
import TodoList from './Todolist';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]); // Step 1: Create todoList state

  const addTodo = (newTodo) => { // Step 2: Declare addTodo function
    setTodoList([...todoList, newTodo]); // Step 3: Update todoList state
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} /> {/* Step 4: Update onAddTodo prop */}
      <TodoList todoList={todoList} /> {/* Pass todoList as a prop */}
    </div>
  );
}

export default App;
