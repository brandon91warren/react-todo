import React from 'react';

// Create an array with at least 3 objects containing id and title properties
const todoList = [
  { id: 1, title: 'Complete assignment' },
  { id: 2, title: 'Read a book' },
  { id: 3, title: 'Go for a walk' }
];

// Define the TodoList function
function TodoList() {
    return (
        <div>
            <ul>
                {todoList.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}

// Export TodoList as the default export
export default TodoList;
