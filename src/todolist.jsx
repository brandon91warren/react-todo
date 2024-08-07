import TodoListItem from "./todolistitem.jsx";

export default function TodosList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          title={todo.title}
          onRemoveTodo={onRemoveTodo}
          id={todo.id}
        />
      ))}
    </ul>
  );
}
