import React from 'react';

function AddTodoForm(props) {
  const handleAddTodo = (event) => {
    event.preventDefault();

    const todoTitle = event.target.elements.title.value;
    console.log(todoTitle);

    // Invoke the onAddTodo callback prop and pass todoTitle as an argument
    props.onAddTodo(todoTitle);

    event.target.reset();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input type="text" name="title" placeholder="Add new todo" />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
