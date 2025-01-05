import React, { Component } from "react";
import AlertDialog from "./confirmDialog";
import "../App.css";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Snack from "./snackbar";
import { CardHeader, Tooltip, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  createTask,
  deleteTask,
  fetchTask,
  updateTask,
} from "../redux/taskSlice";
import { connect } from "react-redux";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import DialogForm from "./dialogform";
import EmptyList from "./taskListempty";
class Tasklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSmallScreen: window.matchMedia("(max-width: 600px)").matches,
      viewCompleted: true, // active tab
      value: 0,
      todoList: [],
      modal: false, //submit & edit dialog open@close
      confirmDel: false, //confirm delete dialog open@close
      popup: false, //snackbar open@close
      popupContent: {
        //snackbar type & message
        severity: "",
        message: "",
      },
      alertContent: {
        // on confirm delete data
        message:
          "This action cannot be undone. All data related to this task will be deleted",
        button: "Task",
      },
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    console.log(source);
    console.log(destination);
    this.dndUpdateTask(source, destination);
    //update the task status
  };
  dndUpdateTask = (source, destination) => {
    const taskfrom = source.droppableId;
    const taskTo = destination.droppableId;
    const taskId = source.index;
    const task = this.props.task.data.filter((item) => item.id === taskId);
    let newTask = [task[0]];
    newTask = newTask.map((item) =>
      taskTo === "complete"
        ? { ...item, completed: true }
        : { ...item, completed: false }
    );
    console.log(newTask);
    this.props.updateTask(newTask[0]).then(() => {
      this.refreshList();
      this.togglesnack("edit");
    });
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  componentDidMount() {
    this.refreshList();
    this.mediaQuery = window.matchMedia("(max-width: 600px)");
    this.mediaQuery.addEventListener("change", this.handleResize);
  }
  componentWillUnmount() {
    this.mediaQuery.removeEventListener("change", this.handleResize); // Clean up the listener
  }
  handleResize(event) {
    this.setState({ isSmallScreen: event.matches }); // Update state when the screen size changes
  }
  refreshList = () => {
    this.props.fetchTask(this.props.auth.data.user.email);
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  togglesnack = (snacktype) => {
    this.setState({ popup: !this.state.popup });
    if (snacktype == "delete") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Task deleted successfully",
        },
      });
    } else if (snacktype == "submit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Task submitted successfully",
        },
      });
    } else if (snacktype == "edit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Task edited successfully",
        },
      });
    } else if (snacktype == "error") {
      this.setState({
        popupContent: {
          severity: "error",
          message: "Error: please make sure the data are valid",
        },
      });
    }
  };

  handleSubmitItem = (item) => {
    this.toggle();
    if (item.id) {
      console.log(item);
      this.props.updateTask(item).then(() => {
        this.refreshList();
        this.togglesnack("edit");
      });
    } else {
      const newItem = { ...item, created_by: this.props.auth.data.user.email };
      this.props.createTask([newItem]).then(() => {
        this.refreshList();
        this.togglesnack("submit");
      });
    }
  };

  handleDelete = (item) => {
    //open modal confirm delete
    this.setState({ activeItem: item, confirmDel: !this.state.confirmDel });
  };

  handleDeleteItem = (item) => {
    this.handleDelete();
    item = this.state.activeItem;
    try {
      this.props.deleteTask(item.id).then(() => {
        this.refreshList();
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardContent sx={{ justifyItems: "center" }}>
            <Stack direction="row" spacing={2}>
              <Typography>Incompleted Task</Typography>
              <NotInterestedIcon color="error" />
            </Stack>
          </CardContent>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardContent sx={{ justifyItems: "center" }}>
            <Stack direction="row" spacing={2}>
              <Typography>Completed Task</Typography>
              <TaskAltIcon  color="success"/>
            </Stack>
          </CardContent>
        </Grid>
      </>
    );
  };
  renderSmallTabList = () => {
    return (
      <>
        <Grid size={{ xs: 6, md: 6 }}>
          <CardContent sx={{ justifyItems: "center" }}>
            <Stack direction="row">
            <Typography>Incompleted</Typography>
              <NotInterestedIcon color="error" />
            </Stack>
          </CardContent>
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <CardContent sx={{ justifyItems: "center" }}>
            <Stack direction="row" >
            <Typography>Completed</Typography>
              <TaskAltIcon  color="success"/>
            </Stack>
          </CardContent>
        </Grid>
      </>
    );
  };
  renderItems = (taskItems) => {
    //drag and drog
    return taskItems.map((item, index) => (
      <Draggable key={item.id} draggableId={item.id.toString()} index={item.id}>
        {(provided) => (
          <li ref={provided.innerRef} {...provided.draggableProps}>
            <Card sx={{ margin: 1 }}>
              <Grid container spacing={2} sx={{ margin: 1 }}>
                <Grid {...provided.dragHandleProps} size={{ xs: 1, md: 1 }}>
                  <DragIndicatorIcon />
                </Grid>
                <Grid size={{ xs: 8, md: 9 }}>
                  <Stack direction="column">
                    <Typography sx={{ textAlign: "start", fontSize: 16 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ textAlign: "start" }}>
                      {item.description}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 1, md: 2 }}>
                  <Stack direction="row">
                    <Tooltip title={"edit"} arrow>
                      <IconButton
                        sx={{ padding: 0 }}
                        color="secondary"
                        onClick={() => this.editItem(item)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"delete"} arrow>
                      <IconButton
                        sx={{ padding: 0 }}
                        color="error"
                        onClick={() => this.handleDelete(item)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </li>
        )}
      </Draggable>
    ));
  };

  renderSmallItems = (taskItems) =>{
    return taskItems.map((item, index) => (
      <Draggable key={item.id} draggableId={item.id.toString()} index={item.id}>
        {(provided) => (
          <li ref={provided.innerRef} {...provided.draggableProps}>
            <Card sx={{ marginTop: 1 }}>
              <Grid container  sx={{ margin: 1 }}>
                {/* <Grid {...provided.dragHandleProps} size={{ xs: 1, md: 1 }}>
                  <DragIndicatorIcon />
                </Grid> */}
                <Grid {...provided.dragHandleProps} size={{ xs: 10, md: 9 }}>
                  <Stack direction="column">
                    <Typography sx={{ textAlign: "start",   fontSize: 14 }}>
                      {item.title}
                    </Typography>
                    <Typography  sx={{ textAlign: "start", fontSize: 12 }}>
                      {item.description}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 2, md: 2 }}>
                  <Stack direction="column">
                    <Tooltip title={"edit"} arrow>
                      <IconButton
                        sx={{ padding: 0 }}
                        color="secondary"
                        onClick={() => this.editItem(item)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"delete"} arrow>
                      <IconButton
                        sx={{ padding: 0 }}
                        color="error"
                        onClick={() => this.handleDelete(item)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </li>
        )}
      </Draggable>
    ));
  }

  render() {
    const { task } = this.props;
    const incomplete = task.data.filter((item) => item.completed === false);
    const complete = task.data.filter((item) => item.completed === true);

    return (
      <>
        <Card variant="outlined" sx={{ minWidth: 275 }}>
          <CardHeader
            title="Task"
            subheader="Breakdown your daily task"
            action={
              <div align="right">
                <IconButton
                color="primary"
                onClick={this.createItem}
                >
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </div>
            }
          />
          <CardContent>
            <Card>
              <Grid container spacing={2}>
                {this.state.isSmallScreen ? this.renderSmallTabList() : this.renderTabList()}
                {task.data !== null && task.data.length !== 0 ? (
                  <>
                    <DragDropContext onDragEnd={this.handleDragEnd}>
                      <Droppable droppableId="incomplete" direction="vertical">
                        {(provided) => (
                          <Grid size={{ xs: 6, md: 6 }}>
                            <ul
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="list-group list-group-flush border-top-0  "
                            >
                              {this.state.isSmallScreen ? this.renderSmallItems(incomplete) : this.renderItems(incomplete)}
                              {provided.placeholder}
                            </ul>
                          </Grid>
                        )}
                      </Droppable>
                      <Droppable droppableId="complete" direction="vertical">
                        {(provided) => (
                          <Grid size={{ xs: 6, md: 6 }}>
                            <ul
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="list-group list-group-flush border-top-0  "
                            >
                              {this.state.isSmallScreen ? this.renderSmallItems(incomplete) : this.renderItems(incomplete)}
                              {provided.placeholder}
                            </ul>
                          </Grid>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </>
                ) : (
                  <>
                    <Grid size={{ xs: 12, md: 12 }}>
                      <EmptyList />
                    </Grid>
                  </>
                )}
              </Grid>
            </Card>
          </CardContent>
        </Card>
        {this.state.modal ? (
          <DialogForm
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmitItem}
            flag="task"
          />
        ) : null}
        {this.state.confirmDel ? (
          <AlertDialog
            activeItem={this.state.activeItem}
            handleDelete={this.handleDelete}
            deleteItem={this.handleDeleteItem}
            alertContent={this.state.alertContent}
          />
        ) : null}
        {this.state.popup ? (
          <Snack
            togglesnack={this.togglesnack} // the function
            open={this.state.popup}
            message={this.state.popupContent.message}
            severity={this.state.popupContent.severity}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  task: state.task,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  fetchTask: (email) => dispatch(fetchTask(email)),
  updateTask: (data) => dispatch(updateTask(data)),
  deleteTask: (id) => dispatch(deleteTask(id)),
  createTask: (data) => dispatch(createTask(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);
