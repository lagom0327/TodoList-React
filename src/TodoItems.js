import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

class TodoItems extends PureComponent {
  render() {
    const {
      // eslint-disable-next-line max-len
      todos, deleteTodo, markTodo, updateTodo, whichIdIsEdite, handleChange, editeContent, handleClickIsEdite,
    } = this.props;
    console.log('todos');
    return (
      <ul className="row todo__items">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleChange={handleChange}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            markTodo={markTodo}
            whichIdIsEdite={whichIdIsEdite}
            editeContent={editeContent}
            handleClickIsEdite={handleClickIsEdite}
          />
        ))}
      </ul>
    );
  }
}

TodoItems.defaultProps = {
  todos: [{
    id: 1,
    isCompleted: false,
    content: 'I am default!',
  }],
  whichIdIsEdite: null,
};

TodoItems.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  deleteTodo: PropTypes.func.isRequired,
  markTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClickIsEdite: PropTypes.func.isRequired,
  editeContent: PropTypes.string.isRequired,
  whichIdIsEdite: PropTypes.number,
};

export default TodoItems;
