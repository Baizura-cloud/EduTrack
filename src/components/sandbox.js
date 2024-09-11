import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo,  toggleComplete } from "../redux/todoSlice";
import { Button, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

const AddTodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [checked, setChecked] = React.useState([0]);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    dispatch(toggleComplete({id: value.id, completed: !value.completed}))
  };

  const handleDelete = (todo) =>{
    console.log(todo)
    dispatch(deleteTodo({id:todo.id}))
  }

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
       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo.id}`;

        return (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(todo)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={todo.title} />
              
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  );
};

export default AddTodoForm;
