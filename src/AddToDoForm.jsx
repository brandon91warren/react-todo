import React from 'react';

// Declare the AddTodoForm function
function AddTodoForm() {
    return (
        <form>
            <label htmlFor="todoTitle">Title</label>
            <input type="text" id="todoTitle" />
            <button type="submit">Add</button>
        </form>
    );
}

// Export AddTodoForm as the default export
export default AddTodoForm;
