import React from 'react';

function TodoListItem(props) {
  const { todo, onComplete } = props;

  return (
    <li className="todo-list-item">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <button onClick={onComplete}>Complete</button>
    </li>
  );
}

export default TodoListItem;
