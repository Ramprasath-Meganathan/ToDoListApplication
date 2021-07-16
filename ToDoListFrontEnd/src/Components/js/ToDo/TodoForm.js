import React, { useState } from "react";
import "../../css/ToDo.css";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  //to handle the save item button click and add the value in the database
  const handleSubmit = e => {
    e.preventDefault();  
    if (!value) return;
    addTodo(value)
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <label><h6><strong>Task:</strong></h6></label>     
        <input
          style = {{paddingLeft:10, width:300, height:30}}
        type="text"
        className="input"
          value={value}
          placeholder="What do you need to do?"
        onChange={e => setValue(e.target.value)}
        />
          <button className='btn btn-primary btn-lg btn-block' type="submit" disabled={!value} onSubmit={handleSubmit}>Save Item</button>
        </div>
        </form>
  );
}

export default TodoForm