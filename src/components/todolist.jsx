import TodoListItem from "./todolistitem.jsx";
import PropTypes from 'prop-types';

export default function TodosList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}  
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}

TodosList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};
