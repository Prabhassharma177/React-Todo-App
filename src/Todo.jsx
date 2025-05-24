import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";

export default function Todo() {
  const [todos, setTodos] = useState([
    { id: uuidv4(), task: "Sample Task", isDone: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTodos((prev) => [...prev, { id: uuidv4(), task: newTask, isDone: false }]);
    setNewTask("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggleDone = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleMarkAllDone = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, isDone: true })));
  };

  return (
    <div className="todo-wrapper">
      <h2>React To-Do App</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.isDone ? "done" : ""}>
            <span>{todo.task}</span>
            <div className="buttons">
              <button onClick={() => handleToggleDone(todo.id)}>
                {todo.isDone ? "Undo" : "Done"}
              </button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleMarkAllDone} className="mark-all-btn">
        Mark All Done
      </button>
    </div>
  );
}
