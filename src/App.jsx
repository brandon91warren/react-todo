import "./App.css";
import { useEffect, useState } from "react";
import TodoList from './todolist';
import AddTodoForm from './AddToDoForm';

function useSemiPersistentState() {
//Get all existing todo's from localStorgage when the app first loads: localStorage stores array as JSON string, and JSON.parse converts it back to an array
const existingTodo =
  JSON.parse(localStorage.getItem("savedTodoList")) ?? [];
//Create state for todo with an intial value of existingTodo
const [todoList, setTodoList] = useState(existingTodo);


  useEffect(() => {
    //localStorage to store our todoList as a JSON string
    const todoListstring = JSON.stringify(todoList);
    //Save todoList to localStorage using a key of "savedTodoList"
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);
  //dependancy array in useEffect contains todoList state. Tells react to run the callback whenever todoList changes

  //return the state wee wish to use in our components
  return [todoList, setTodoList];
}

function App() {
  //Retrieve our todoState from the customHook
  const [todoList, setTodoList] = useSemiPersistentState([]);

  function addTodo(newTodo) {
    setTodoList((previousTodoList) => [...previousTodoList, newTodo]);
  }

  function removeTodo(id) {
    const filteredTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodo);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} /> 
      <TodoList onRemoveTodo={removeTodo} todoList={todoList} /> 
    </div>
  );
}

export default App;
