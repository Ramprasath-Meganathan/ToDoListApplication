import React from "react";
import "../../css/ToDo.css";

//created to show the todo item in the task list
function TodoItem({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isComplete ? "line-through" : "" }}>
      <h6>{todo.name}</h6>
      <div>
         <button className="btn btn-success" hidden={todo.isComplete} onClick={() => completeTodo(index)}>✓</button> 
        <button className="btn btn-danger" onClick={() => removeTodo(todo)}>X</button>
      </div>
    </div>
  );
}

export default TodoItem