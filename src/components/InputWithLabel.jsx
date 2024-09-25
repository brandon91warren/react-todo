import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';


function InputWithLabel(props) {
    // useRef used to store DOM elements in state
    // Does not cause re-renders unlink variables from useState
    const inputRef = useRef();
    
    console.log(inputRef.current);

    useEffect(() => {
        inputRef.current.focus();
    });

    return(
        <>
        <label htmlFor="ToDoType">{props.children}</label>
        <input
        type="text"
        name="title"
        placeholder="Add new todo"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        ref={inputRef}
      />
    </>
    );
}

InputWithLabel.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
};

export default InputWithLabel;
