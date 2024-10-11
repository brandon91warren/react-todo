import "./App.css";
import { useEffect, useState } from "react";
import TodoList from './components/todolist.jsx'; // Ensure the file name matches exactly
import AddTodoForm from './components/AddToDoForm.jsx'; // Ensure the file name matches exactly
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from './components/TodoListItem.module.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);  // Sort direction state
  const [isLoading, setIsLoading] = useState(true);

  // Add new todo
  async function addTodo(newTodo) {
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
              title: newTodo.title, // Ensure this matches your Airtable base field
            },
          },
        ],
      }),
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      console.log("Payload to Airtable:", {
        records: [
          {
            fields: {
              title: newTodo.title,
            },
          },
        ],
      }); // Log the payload

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const newTodoFromAPI = {
        title: data.records[0].fields.title,
        id: data.records[0].id,
      };

      // Update to append the new todo at the bottom
      setTodoList((prevTodoList) => [...prevTodoList, newTodoFromAPI]);
    } catch (error) {
      console.error('Error adding todo:', error.message);
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
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
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

  // Sort todos based on the selected direction
  const sortedTodoList = [...todoList].sort((a, b) => {
    if (sortAsc) {
      return a.id.localeCompare(b.id); // Change to a.date - b.date if id represents date
    } else {
      return b.id.localeCompare(a.id); // Change to b.date - a.date if id represents date
    }
  });

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">To Do List</Link>
          </li>
          <li>
            <Link to="/new">Landing Page</Link>
          </li>
        </ul>
      </nav>

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
                <TodoList onRemoveTodo={removeTodo} todoList={sortedTodoList} />
              )}
            </main>
          }
        />

        <Route
          path="/new"
          element={
            <h1>
              {todoList.length === 0
                ? "New Todo List"
                : `Welcome to my To Do List App`}
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
