import React from 'react';
import style from './TodoListItem.module.css'; // Import CSS module

export default function TodoListItem({ title, onRemoveTodo, id }) {
  return (
    <li className={style.ListItem}>
      {title} <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
}
