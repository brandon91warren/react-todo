import React from 'react';

export default function TodoListItem({ title, onRemoveTodo, id }) {
  return (
    <li>
      {title} <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
}
