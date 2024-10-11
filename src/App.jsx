import "./App.css";
import { useEffect, useState } from "react";
import TodoList from './components/todolist.jsx';
import AddTodoForm from './components/AddToDoForm.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from './components/TodoListItem.module.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);  // Sort direction state
  const [isLoading, setIsLoading] = useState(true);

  // Add new todo
  async function addTodo(newTodoTitle) {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              title: newTodoTitle.title,
              id: newTodoTitle.id,  // Ensure ID is sent as integer if needed
            },
          },
        ],
      }),
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();

      const newTodo = {
        title: data.records[0].fields.title,
        id: data.records[0].id,
      };

      // Add new todo and update list
      setTodoList((prevTodoList) => [newTodo, ...prevTodoList]);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  // Fetch todos
  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const query1 = "?view=Grid%20view";

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}${query1}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        return { 
          id: todo.id, 
          title: todo.fields.title, 
        };
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  // Automatically fetch data when component loads
  useEffect(() => {
    fetchData();
  }, []);

  // Handle sorting toggle
  function handleSortToggleClick() {
    setSortAsc(!sortAsc);  // Toggle the sorting direction
  }

  // Remove a todo from the list
  function removeTodo(id) {
    const filteredTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodo);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>Todo List</h1>
              <button onClick={handleSortToggleClick}>
                {sortAsc ? "Sort by Newest" : "Sort by Oldest"}
              </button>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
              )}
            </main>
          }
        ></Route>

        <Route
          path="/new"
          element={
            <h1>
              {todoList.length === 0
                ? "New Todo List"
                : `There are ${todoList.length} todos`}
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
