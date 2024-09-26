import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Stack, Tooltip } from "@mui/material";
import { connect } from "react-redux";
import {
  createEvent,
  deleteEvent,
  fetchEvent,
  updateEvent,
} from "../redux/eventSlice";
import FormDrawer from "../components/formdrawer";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import AddIcon from "@mui/icons-material/Add";
import Snack from "../components/snackbar";
import AlertDialog from "../components/confirmDialog";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDrawer: false,
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
          "This action cannot be undone. All data related to this event will be deleted",
        button: "Event",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    this.props.fetchEvent();
    this.setState({ eventList: this.props.event.data });
  };
  togglesnack = (snacktype) => {
    this.setState({ popup: !this.state.popup });
    if (snacktype == "delete") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Event deleted successfully",
        },
      });
    } else if (snacktype == "submit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Event submitted successfully",
        },
      });
    } else if (snacktype == "edit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Event edited successfully",
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
  toggle = () => {
    this.setState({ toggleDrawer: !this.state.toggleDrawer }); //function to be use to close drawer
  };
  handlecreateEvent = () => {
    const item = { name: "", details: "" };
    this.setState({ activeItem: item, toggleDrawer: !this.state.toggleDrawer }); //open drawer
  };
  handleeditEvent = (item) => {
    this.setState({ activeItem: item, toggleDrawer: !this.state.toggleDrawer }); //open drawer
  };
  handleSubmitItem = (item) => {
    this.toggle();
    if (item.id) {
      this.props.updateEvent(item).then(() => {
        this.refreshList();
        this.togglesnack("edit");
      });
    } else {
      const newItem = { ...item, created_by: this.props.auth.data.user.email };
      this.props.createEvent([newItem]).then(() => {
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
    this.handleDelete(); // close the alert
    item = this.state.activeItem;
    try {
      this.props.deleteEvent(item.id).then(() => {
        this.refreshList();
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };
  handleClass = (course) => {
    this.setState({ activeDetails: course, openList: true });
  };
  rendereventCard = () => {
    return (
      <>
        {this.state.eventList
          ? this.state.eventList.map((event) => (
              <Card variant="outlined" key={event.id}>
                <CardHeader
                  action={
                    event.created_by == this.props.auth.data.user.email ? (
                      <Stack direction="row">
                        <Tooltip title={"edit"} arrow>
                          <IconButton
                            color="secondary"
                            onClick={() => this.handleeditEvent(event)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"delete"} arrow>
                          <IconButton
                            color="error"
                            onClick={() => this.handleDelete(event)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    ) : null
                  }
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 16 }}
                  >
                    {event.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 12 }}
                  >
                    {event.date}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "justify",
                      color: "text.secondary",
                      mb: 1.5,
                    }}
                  >
                    {event.details}
                  </Typography>
                  <Stack alignItems={"start"}>
                    <Tooltip title={"created by " + event.created_by} arrow>
                      <IconButton color="secondary">
                        <ContactPageIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            ))
          : null}
      </>
    );
  };
  render() {
    return (
      <Box sx={{ minWidth: 275 }}>
        {this.state.toggleDrawer ? (
          <FormDrawer
            toggle={this.toggle}
            activeItem={this.state.activeItem}
            onSave={this.handleSubmitItem}
            flag="event"
          />
        ) : null}
        <Card variant="outlined" sx={{ padding: 2 }}>
          <CardHeader
            title="Event"
            sx={{ textAlign: "start", margin: 2 }}
            action={
              <div align="right">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={this.handlecreateEvent}
                >
                  New Event
                </Button>
              </div>
            }
          />
          <CardContent>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap", textAlign: "start" }}
            >
              {this.rendereventCard()}
            </Stack>
          </CardContent>
        </Card>
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
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: () => dispatch(fetchEvent()),
  createEvent: (data) => dispatch(createEvent(data)),
  updateEvent: (data) => dispatch(updateEvent(data)),
  deleteEvent: (id) => dispatch(deleteEvent(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Event);
