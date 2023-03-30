import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    if (!newTodo.trim()) { 
      return;
    }
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const handleTodoDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleTodoClick = (id) => {
    handleTodoDelete(id);
  };

  return (
    <div id='main'>
      <form onSubmit={handleNewTodoSubmit}>
        <p for="input">New Task :</p>
        <input
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          autoFocus
        />
        <button type="submit">Add Task</button>
      </form>
        {todos.map((todo) => (
          <label
            key={todo.id}
            htmlFor={`todo-${todo.id}`}
            style={{ backgroundColor: 'white', display: 'block', padding: '10px', margin: '5px', borderRadius: '5px' }}
            onMouseEnter={() => {
              document.getElementById(`todo-${todo.id}`).style.color = 'red';
            }}
            onMouseLeave={() => {
              document.getElementById(`todo-${todo.id}`).style.color = 'black';
            }}
            onClick={() => handleTodoClick(todo.id)}
          >
            <span id={`todo-${todo.id}`}>{todo.title}</span>
          </label>
        ))}
    </div>
  );
};

export default TodoApp;
