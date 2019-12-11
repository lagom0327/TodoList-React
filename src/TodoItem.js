import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SendBtn = ({ handleClick }) => (
  <button
    type="button"
    className="todo__item__send_update_btn"
    onClick={handleClick}
  >
    <i className="far fa-check-circle" />
  </button>
);

SendBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

const EditeBtn = ({ editeId }) => (
  <button
    type="button"
    className="todo__item__edite_btn"
    onClick={editeId}
  >
    <i className="fas fa-edit" />
  </button>
);

EditeBtn.propTypes = {
  editeId: PropTypes.func.isRequired,
};

const EditeInput = ({ editeContent, handleChange }) => (
  <input
    type="text"
    className="todo__item_input-edite"
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus
    name="editeContent"
    value={editeContent}
    onChange={handleChange}
  />
);

EditeInput.propTypes = {
  editeContent: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

class TodoItem extends Component {
  delete = () => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  }

  editeId = () => {
    const { todo, handleClickIsEdite } = this.props;
    handleClickIsEdite(todo.id);
  }

  mark = () => {
    const { todo, markTodo } = this.props;
    markTodo(todo.id);
  }

  render() {
    const {
      todo, whichIdIsEdite, handleChange, editeContent, updateTodo,
    } = this.props;
    const isEditing = whichIdIsEdite === todo.id;
    return (
      <li className="col-12 todo__item">
        <label htmlFor={todo.id}>
          <input
            type="checkbox"
            id={todo.id}
            checked={todo.isCompleted}
            onChange={this.mark}
          />
          {isEditing && <EditeInput handleChange={handleChange} editeContent={editeContent} />}
          {!isEditing && <p>{todo.content}</p>}
          <i className="fas fa-square checkmark" />
          <i className="fas fa-check-square checkmark--checked" />
        </label>
        {!isEditing && <EditeBtn editeId={this.editeId} />}
        {isEditing && <SendBtn handleClick={updateTodo} />}
        <button
          type="button"
          className="todo__item__delete_btn"
          onClick={this.delete}
        >
          <i className="fas fa-times" />
        </button>
      </li>
    );
  }
}

TodoItem.defaultProps = {
  whichIdIsEdite: null,
  // editeContent: '',
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    isCompleted: PropTypes.bool,
    content: PropTypes.string,
  }).isRequired,
  whichIdIsEdite: PropTypes.number,
  editeContent: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  markTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  handleClickIsEdite: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TodoItem;
