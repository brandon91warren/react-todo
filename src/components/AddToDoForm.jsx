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
    
    // Clean the input by removing semicolons and trimming whitespace
    const cleanedTitle = todoTitle.replace(/;/g, '').trim();

    if (cleanedTitle) {
      // Create a new todo object with title and id
      const newTodo = {
        title: cleanedTitle,
        id: Date.now().toString(), // Generate a unique ID using timestamp
      };
      console.log('Adding new todo:', newTodo); // Log the new todo for debugging
      onAddTodo(newTodo); // Call the onAddTodo prop with the new todo
      setTodoTitle(''); // Reset the input field
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel 
        todoTitle={todoTitle} 
        handleTitleChange={handleTitleChange}
      >
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
