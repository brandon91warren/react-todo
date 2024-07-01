import React from 'react';
import TodoListItem from './todolistitem';

// Create an array with at least 3 objects containing id and title properties
const todoList = [
  { id: 1, title: 'Complete assignment', description: 'Finish the React project' },
  { id: 2, title: 'Read a book', description: 'Read at least 20 pages' },
  { id: 3, title: 'Go for a walk', description: 'Walk around the park' }
];

// Define the TodoList function
function TodoList(props) {
  return (
    <ul className="todo-list">
      {props.items.map((todo) => (
        <TodoListItem 
          key={todo.id} 
          todo={todo} 
          onComplete={() => props.onComplete(todo.id)}
        />
      ))}
    </ul>
  );
}

// Define the default export to ensure the component receives the correct props
export default function App() {
  const handleComplete = (id) => {
    console.log(`Todo with id ${id} completed`);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList items={todoList} onComplete={handleComplete} />
    </div>
  );
}
