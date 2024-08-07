import "./App.css";
import { useEffect, useState } from "react";
import TodoList from './todolist';
import AddTodoForm from './AddToDoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingTodo = JSON.parse(localStorage.getItem("savedTodoList")) ?? [];
        const object = {
          data: {
            todoList: existingTodo,
          },
        };
        resolve(object);
      }, 2000);
    }).then((result) => {
      const retrievedToDoList = result.data.todoList;
      setTodoList(retrievedToDoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const todoListString = JSON.stringify(todoList);
    localStorage.setItem("savedTodoList", todoListString);
  }, [todoList]);

  function addTodo(newTodo) {
    setTodoList((previousTodoList) => [...previousTodoList, newTodo]);
  }

  function removeTodo(id) {
    const filteredTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodo);
  }

  return (
    <main>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? <p>Loading...</p> : <TodoList onRemoveTodo={removeTodo} todoList={todoList} />}
    </main>
  );
}

export default App;

//How to write a ternary operator?
// condition ? expression if true : expression if false