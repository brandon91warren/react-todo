function InputWithLabel(props) {
    return(
        <>
        <label htmlFor="ToDoType">{props.children}</label>
        <input
        type="text"
        name="title"
        placeholder="Add new todo"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
      />
       </>
    )
}
export default InputWithLabel;
