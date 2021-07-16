import React, { useState, useEffect } from "react";
import "../../css/ToDo.css";
import { ListGroupItem } from "react-bootstrap";
import { addToDo, DeleteToDo, SelectToDo, CompleteToDo } from "../../ApiCalls";
import  TodoItem  from "./TodoItem";
import  TodoForm  from "./TodoForm";

function ToDoPage() {
  const [todos, setTodos] = useState([
  ]);

  useEffect(()=>{
    //to display the existing todo items 
    SelectToDo().then(response=>{
      var data=[]
      if(response!=null){
      Object.keys(response.data).forEach((key)=>{
        var value = response.data[key];
        data.push(value)
      })
      setTodos(data)}
    }
    )
  },[]);

  //to add the new task to the database and in the todo page
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    const newTodo = {
      name:text,
      isComplete: false
    };
    addToDo(newTodo).then(response=>{
      const newTodos = todos.concat(response)
      setTodos(newTodos)
    })
  };

    //to mark the existing task as done
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isComplete = true;
    CompleteToDo(newTodos[index])
    setTodos(newTodos);
  };

  //to remove the todo item from the database
  const removeTodo = todo => {
    const newTodos = [...todos];
    newTodos.splice(todo.index, 1);
    setTodos(newTodos);
    DeleteToDo(todo.id)
    };
    

  return (
      <div className="wrapper">
        <div className="todo-list">
        <h1>Todo List</h1>
          {todos.map((todo, index) => (
          <ListGroupItem key={index}>
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
              />
            </ListGroupItem>
        ))}     
        <TodoForm addTodo={addTodo} />
        </div>
      </div>
  );
}

export default ToDoPage