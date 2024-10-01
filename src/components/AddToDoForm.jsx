import { useState } from 'react';
import PropTypes from 'prop-types';

export default function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  // Define the handleChange function
  const handleChange = (e) => {
    setTodoTitle(e.target.value); // Update the state with input value
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoTitle.trim()) {
      onAddTodo({ title: todoTitle, id: Date.now().toString() }); // Add a new todo
      setTodoTitle(''); // Reset input field
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        value={todoTitle}
        onChange={handleChange} // Use the handleChange function
        placeholder="Add a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};
