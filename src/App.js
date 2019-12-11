import React, { Component } from 'react';
import TodoInput from './TodoInput';
import ProgressBar from './ProgressBar';
import TodoItems from './TodoItems';
import Filters from './Filters';
import './reset.css';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoText: '',
      filter: 'all',
      filters: ['all', 'completed', 'uncompleted'],
      whichIdIsEdite: null,
      editeContent: '',
    };
    this.id = 1;
  }

  componentDidMount() {
    const todoData = window.localStorage.getItem('todoapp');
    if (todoData) {
      const oldTodos = JSON.parse(todoData);
      this.id = oldTodos[oldTodos.length - 1].id + 1;
      this.setState({
        todos: oldTodos,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      window.localStorage.setItem('todoapp', JSON.stringify(todos));
    }
    if (todos.length === 0) {
      window.localStorage.removeItem('todoapp');
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') this.addTodo();
  }

  addTodo = () => {
    const { todoText } = this.state;
    if (!todoText) return;
    const { todos } = this.state;
    this.setState({
      todos: [...todos, {
        id: this.id,
        isCompleted: false,
        content: todoText,
      }],
      todoText: '',
    });

    this.id += 1;
  }

  updateTodo = () => {
    const { todos, whichIdIsEdite, editeContent } = this.state;
    const editedTodo = todos.find((todo => todo.id === whichIdIsEdite));
    console.log('editedTodo', editedTodo);
    editedTodo.content = editeContent;
    this.setState({
      todos: [...todos.filter(todo => todo.id !== whichIdIsEdite),
        editedTodo,
      ],
      whichIdIsEdite: null,
      editeContent: '',
    });
  };

  handleClickIsEdite = id => {
    const { todos } = this.state;
    this.setState({
      whichIdIsEdite: id,
      editeContent: todos.find(todo => todo.id === id).content,
    });
  }


  deleteTodo = id => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id),
    });
  }

  markTodo = id => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map(todo => (
        (todo.id !== id) ? todo : {
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      )),
    });
  }

  changeFilter = filter => {
    this.setState({
      filter,
    });
  }

  render() {
    const { filter, whichIdIsEdite, editeContent } = this.state;
    let { todos } = this.state;
    const ratio = todos.length === 0
      ? 0 : todos.filter(todo => todo.isCompleted).length / todos.length;
    if (filter !== 'all') {
      todos = todos.filter(todo => (filter === 'completed' ? todo.isCompleted : !todo.isCompleted));
    }

    const { filters, todoText } = this.state;
    return (
      <div className="container">
        <header className="todo__header">Todo List</header>
        <TodoInput
          todoText={todoText}
          handleChange={this.handleChange}
          addTodo={this.addTodo}
          handleKeyDown={this.handleKeyDown}
        />
        <ProgressBar ratio={ratio} />
        <Filters
          filter={filter}
          filters={filters}
          changeFilter={this.changeFilter}
        />
        <TodoItems
          todos={todos}
          handleChange={this.handleChange}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          markTodo={this.markTodo}
          whichIdIsEdite={whichIdIsEdite}
          editeContent={editeContent}
          handleClickIsEdite={this.handleClickIsEdite}
        />
      </div>
    );
  }
}

export default App;
