import "./App.css";
import { useEffect, useState } from "react";
import TodoList from './components/todolist.jsx';
import AddTodoForm from './components/AddToDoForm.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from './components/TodoListItem.module.css';

function sortTodosAscending(objectA, objectB) {
  if (new Date(objectA.createdTime) < new Date(objectB.createdTime)) {
    return -1;  // For ascending order
  } else if (new Date(objectA.createdTime) > new Date(objectB.createdTime)) {
    return 1;
  } else {
    return 0;
  }
}

function sortTodosDescending(objectA, objectB) {
  if (new Date(objectA.createdTime) < new Date(objectB.createdTime)) {
    return 1;   // For descending order
  } else if (new Date(objectA.createdTime) > new Date(objectB.createdTime)) {
    return -1;
  } else {
    return 0;
  }
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);  // Sort direction state
  const [isLoading, setIsLoading] = useState(true);

  // Add new todo and sort the list automatically
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
              id: newTodoTitle.id,
              createdTime: new Date().toISOString()  // Capture created time when adding
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
        createdTime: data.records[0].createdTime  // Store created time
      };

      // Add new todo and sort the updated list
      setTodoList((prevTodoList) => {
        const updatedList = [newTodo, ...prevTodoList];
        return sortedTodos(updatedList);  // Sort the updated list
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  // Fetch todos and sort them
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
          createdTime: todo.createdTime // Ensure we fetch the createdTime
        };
      });

      setTodoList(sortedTodos(todos));  // Sort and store the fetched todos
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  // Automatically re-sort todos when todoList changes
  useEffect(() => {
    setTodoList((prevTodoList) => sortedTodos(prevTodoList));
  }, [todoList, sortAsc]);

  useEffect(() => {
    fetchData();
  }, []);

  // Sort todos based on the current sort order
  function sortedTodos(todos) {
    return todos.sort((objectA, objectB) => {
      if (sortAsc) {
        return sortTodosAscending(objectA, objectB);  // Use createdTime sorting
      } else {
        return sortTodosDescending(objectA, objectB);
      }
    });
  }

  // Handle sorting toggle
  function handleSortToggleClick() {
    const sortedList = sortedTodos([...todoList]);  // Sort the existing todo list
    setTodoList(sortedList);  // Update the state with the sorted list
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
