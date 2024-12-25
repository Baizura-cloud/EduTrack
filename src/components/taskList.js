import React, { Component } from "react";
import AlertDialog from "./confirmDialog";
import "../App.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
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
import {
  createTask,
  deleteTask,
  fetchTask,
  updateTask,
} from "../redux/taskSlice";
import { connect } from "react-redux";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import FormDrawer from "./formdrawer";

class Tasklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  componentDidMount() {
    this.refreshList();
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
    const { value } = this.state;
    return (
      <>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardContent sx={{ justifyItems: "center" }}>
            <Stack direction="row" spacing={2}>
              <Typography>Incompleted Task</Typography>
              <NotInterestedIcon />
            </Stack>
          </CardContent>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardContent sx={{ justifyItems: "center" }}>
            <Stack direction="row" spacing={2}>
              <Typography>Completed Task</Typography>
              <TaskAltIcon />
            </Stack>
          </CardContent>
        </Grid>
      </>
    );
  };
  // renderSmallTabList = () => {
  //   const { value } = this.state;
  //   return (
  //     <Box sx={{ width: "100%", borderColor: "divider" }}>
  //       <Tabs
  //         centered
  //         value={value}
  //         onChange={this.handleChange}
  //         textColor="primary"
  //         indicatorColor="primary"
  //       >
  //         <Tab
  //           label="Completed"
  //           icon={<TaskAltIcon />}
  //           iconPosition="end"
  //           onClick={() => this.displayCompleted(true)}
  //         />
  //         <Tab
  //           label="Incompleted"
  //           icon={<NotInterestedIcon />}
  //           iconPosition="end"
  //           textColor="secondary"
  //           onClick={() => this.displayCompleted(false)}
  //         />
  //       </Tabs>
  //     </Box>
  //   );
  // };
  renderItems = (taskItems) => {
    //drag and drog
    return taskItems.map((item) => (
      <li>
        <Card sx={{ margin: 1 }}>
          <Grid container spacing={2} sx={{ margin: 2 }}>
            <Grid size={{ xs: 8, md: 10 }}>
              <Typography sx={{ textAlign: "start", fontSize: 16 }}>
                {item.title}
              </Typography>
              <Typography variant="subtitle2" sx={{ textAlign: "start" }}>
                {item.description}
              </Typography>
            </Grid>
            <Grid size={{ xs: 4, md: 2 }}>
              <Stack direction="row">
                <Tooltip title={"edit"} arrow>
                  <IconButton
                    color="secondary"
                    onClick={() => this.editItem(item)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"delete"} arrow>
                  <IconButton
                    color="error"
                    onClick={() => this.handleDelete(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </li>
    ));
  };

  render() {
    const { task } = this.props;
    // if (task.data == null) {
    //   return;
    // } // if list empty put image empty list
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
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={this.createItem}
                >
                  New task
                </Button>
              </div>
            }
          />
          <CardContent>
            <Card>
              <Grid container spacing={2}>
                {this.renderTabList()}
                {task.data !== null ? (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <ul className="list-group list-group-flush border-top-0  ">
                        {this.renderItems(incomplete)}
                      </ul>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <ul className="list-group list-group-flush border-top-0  ">
                        {this.renderItems(complete)}
                      </ul>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </Card>
          </CardContent>
        </Card>
        {this.state.modal ? (
          <FormDrawer
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
