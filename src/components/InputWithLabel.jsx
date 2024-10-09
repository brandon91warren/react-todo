import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
    // Create a ref for the input element
    const inputRef = useRef();

    // Focus the input when the component mounts
    useEffect(() => {
        inputRef.current.focus();
    }, []); // Empty dependency list to run only on mount

    return (
        <>
            <label htmlFor="ToDoType">{children}</label>
            <input
                type="text"
                name="title"
                placeholder="Add new todo"
                value={todoTitle}
                onChange={handleTitleChange}
                ref={inputRef}
            />
        </>
    );
}

// Correct propTypes for the props used in the component
InputWithLabel.propTypes = {
    todoTitle: PropTypes.string.isRequired, // Updated prop name to match the usage
    handleTitleChange: PropTypes.func.isRequired, // Updated prop name to match the usage
    children: PropTypes.node.isRequired, // Prop for label text
};

export default InputWithLabel;
