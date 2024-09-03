import React, { Component } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormControlLabel,
    DialogTitle,
    Button,
    Checkbox,
    InputLabel,
    Input,
    FormHelperText
  } from "@mui/material";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: false,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    if (e.target.name == "title") {
      if (e.target.value == "") {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
    } else if (e.target.name == "description") {
      if (e.target.value == "") {
        this.setState({ error1: true });
      } else {
        this.setState({ error: false });
      }
    }

    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Dialog fullWidth={true} maxWidth={"sm"} open={true} onClose={toggle}>
        <DialogTitle>Task</DialogTitle>
        <DialogContent sx={{ paddingTop: 2 }}>
          <InputLabel>Title</InputLabel>
          <FormControl error={this.state.error} fullWidth={true}>
            <Input
              type="text"
              id="todo-title"
              name="title"
              value={this.state.activeItem.title}
              onChange={this.handleChange}
            />
            <FormHelperText id="my-helper-text">
              {this.state.error ? "Must not empty" : " "}
            </FormHelperText>
          </FormControl>
          <InputLabel sx={{ paddingTop: 2 }}>Description</InputLabel>
          <FormControl error={this.state.error1} fullWidth={true}>
            <Input
              type="text"
              id="todo-description"
              name="description"
              value={this.state.activeItem.description}
              onChange={this.handleChange}
            />
            <FormHelperText id="my-helper-text">
              {this.state.error1 ? "Must not empty" : " "}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth={true}>
            <FormControlLabel
              control={<Checkbox />}
              label="completed"
              name="completed"
              checked={this.state.activeItem.completed}
              onChange={this.handleChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          {/* <Button variant="outlined" color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button> */}
        </DialogActions>
      </Dialog>
    );
  }
}
