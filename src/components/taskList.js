import React, { Component } from "react";
import AlertDialog from "./confirmDialog";
import "../App.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Snack from "./snackbar";
import { CardHeader } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { createTask, deleteTask, fetchTask, updateTask } from "../redux/taskSlice";
import { connect } from "react-redux";
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
    if(item.id){
      this.props.updateTask(item).then(()=>{
        this.refreshList()
        this.togglesnack("edit")
      })
    }else{
      const newItem = {...item, created_by: this.props.auth.data.user.email}
      this.props.createTask([newItem]).then(()=>{
        this.refreshList()
        this.togglesnack("submit")
      })
    }
    
  };

  handleDelete = (item) => { //open modal confirm delete
    this.setState({ activeItem: item, confirmDel: !this.state.confirmDel });
  };

  handleDeleteItem = (item) => {
    this.handleDelete();
    item = this.state.activeItem;
    try {
      this.props.deleteTask(item.id).then(()=>{
        this.refreshList()
        this.togglesnack("delete")
      })
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
      <Tabs
        centered
        value={value}
        onChange={this.handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          label="Completed Task"
          icon={<TaskAltIcon />}
          iconPosition="end"
          onClick={() => this.displayCompleted(true)}
        />
        <Tab
          label="Incompleted Task"
          icon={<NotInterestedIcon />}
          iconPosition="end"
          textColor="secondary"
          onClick={() => this.displayCompleted(false)}
        />
      </Tabs>
    );
  };
  renderSmallTabList = () => {
    const { value } = this.state;
    return (
      <Box sx={{ width: "100%", borderColor: "divider" }}>
        <Tabs
          centered
          value={value}
          onChange={this.handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            label="Completed"
            icon={<TaskAltIcon />}
            iconPosition="end"
            onClick={() => this.displayCompleted(true)}
          />
          <Tab
            label="Incompleted"
            icon={<NotInterestedIcon />}
            iconPosition="end"
            textColor="secondary"
            onClick={() => this.displayCompleted(false)}
          />
        </Tabs>
      </Box>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const { task } = this.props;
    if (task.data == null) {
      return;
    }
    const newItems = task.data.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li key={item.id}>
        <Accordion sx={{ marginTop: 2, textAlign:'start' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id={item.id}
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2">{item.description}</Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => this.editItem(item)}
              size="small"
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => this.handleDelete(item)}
              size="small"
            >
              Delete
            </Button>
          </AccordionActions>
        </Accordion>
      </li>
    ));
  };

  render() {
    return (
      <>
        <Card variant="outlined" sx={{ minWidth: 275 }}>
          <CardHeader
            title="Task"
            subheader="Breakdown your daily task"
            action={
              <div align="right">
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={this.createItem}
                >
                  New task
                </Button>
              </div>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid  xs={12} sx={{ display: { xs: "none", md: "block" } }}>
                {this.renderTabList()}
              </Grid>
              <Grid  xs={12} sx={{ display: { xs: "block", md: "none" } }}>
                {this.renderSmallTabList()}
              </Grid>
            </Grid>
            <ul className="list-group list-group-flush border-top-0  ">
              {this.renderItems()}
            </ul>
          </CardContent>
        </Card>
        {this.state.modal ? (
          <FormDrawer
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmitItem}
            flag='task'
          />
        ) : null}
        {this.state.confirmDel ? (
          <AlertDialog
            activeItem={this.state.activeItem}
            handleDelete={this.handleDelete}
            deleteItem={this.handleDeleteItem}
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
  createTask: (data) => dispatch(createTask(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);
