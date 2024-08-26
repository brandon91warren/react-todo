import "./App.css";
import { useEffect, useState } from "react";
import TodoList from './todolist';
import AddTodoForm from './AddToDoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
              title: newTodoTitle,
            },
          },
        ],
      }),
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

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

      setTodoList((prevTodoList) => [newTodo, ...prevTodoList]);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        return { id: todo.id, title: todo.fields.title };
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
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