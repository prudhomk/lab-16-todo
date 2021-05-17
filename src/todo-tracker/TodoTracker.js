import { Component } from 'react';
import { addTodo, getTodo, deleteTodo, completeTodo } from '../utils/todos-api';
import './TodoTracker.css';

export default class TodoTracker extends Component {
  state = {
    taskName: '',
    todos: []
  }

  async componentDidMount() {
    try {
      const todos = await getTodo();
      this.setState({ todos: todos });
    }
    catch (err) {
      console.log(err);
    }
  }

  handleAdd = async e => {
    e.preventDefault();
    const { taskName, todos } = this.state;

    try {
      const addedTodo = await addTodo({ name: taskName });
      const updatedTodos = [...todos, addedTodo];
      this.setState({
        todos: updatedTodos,
        taskName: ''
      });
    }
    catch (err) {
      console.log(err.message);
    }
  }

  handleTodoNameChange = ({ target }) => {
    this.setState({ taskName: target.value });
  }

  handleDelete = async id => {
    const { todos } = this.state;

    try {
      await deleteTodo(id);

      const updatedTodos = todos.filter(todo => todo.id !== id);
      this.setState({ todos: updatedTodos });
    }
    catch (err) {
      console.log(err);
    }
  }

  handleCompleted = async id => {
    const { todos } = this.state;

    try {
      const updatedTodo = await completeTodo(id);

      const updatedTodos = todos.map(todo => todo.id === id ? updatedTodo : todo);
      this.setState({ todos: updatedTodos });
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    const { taskName, todos } = this.state;

    return (
      <div className="TodoTrackerPage">

        <form onSubmit={this.handleAdd}>
          Add a new todo:
          <input value={taskName} onChange={this.handleTodoNameChange}/>
        </form>

        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <h2>{todo.name}</h2>
              <span>{todo.lives} {todo.lives === 1 ? 'Completed' : 'Complete'}</span>
              <button className="complete" onClick={() => this.handleCompleted(todo.id)}>✓&2713;</button>
              <button className="delete" onClick={() => this.handleDelete(todo.id)}>X</button>

            </li>
          ))}
        </ul>
      </div>
    );
  }
}