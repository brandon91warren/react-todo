import "./App.css";

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Create an array with at least 3 objects containing id and title properties
const todoList = [
  { id: 1, title: 'Complete assignment' },
  { id: 2, title: 'Read a book' },
  { id: 3, title: 'Go for a walk' }
]

function App() {
  const [count, setCount] = useState(0)

  // Return JSX with a JavaScript expression to render todoList items
  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  )
}

export default App

