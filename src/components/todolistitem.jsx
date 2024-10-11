import PropTypes from 'prop-types';

export default function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li>
      {todo.title}
      <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdTime: PropTypes.string.isRequired, // Include createdTime if needed
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};
