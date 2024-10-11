import TodoListItem from "./todolistitem.jsx";
import PropTypes from 'prop-types';

export default function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div>
      {todoList.map(todo => (
        <TodoListItem 
          key={todo.id} 
          todo={{ ...todo, title: todo.title.replace(/;/g, '') }} // Clean the title here
          onRemoveTodo={onRemoveTodo} 
        />
      ))}
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};
