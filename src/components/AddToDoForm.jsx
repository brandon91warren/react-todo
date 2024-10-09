// AddTodoForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel'; // Ensure this import is correct

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim()) {
      onAddTodo({ title: todoTitle, id: Date.now().toString() });
      setTodoTitle(''); // Reset the input field
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
        Todo Title
      </InputWithLabel>
      <button type="submit">Add Todo</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
