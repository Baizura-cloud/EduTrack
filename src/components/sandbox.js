import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import { Typography } from "@mui/material";

const AddTodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  
  const onSubmit = (event) => {
    event.preventDefault();
    if (value) {
      dispatch(
        addTodo({
        id: 1,
          title: value,
        })
      );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
        <label className="sr-only">Name</label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          placeholder="Add todo..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>

        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
      <ul className='list-group'>
            {todos.map((todo) => (
                <Typography>
                    {todo.id} {todo.title} {todo.completed}
                </Typography> 
            ))}
        </ul>
    </div>
  );
};

export default AddTodoForm;
