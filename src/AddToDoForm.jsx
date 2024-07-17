import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    const newTodo = {
      title: todoTitle,
      id: Date.now(),
    };

    onAddTodo(newTodo);
    setTodoTitle('');
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        name="title"
        placeholder="Add new todo"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
