import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AccordionActions, CardHeader, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PeopleIcon from "@mui/icons-material/People";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  createClassStudent,
  deleteClassStudent,
  fetchClassStudent,
  updateClassStudent,
} from "../redux/classSlice";
import { connect } from "react-redux";
import FormDrawer from "../components/formdrawer";
import DialogForm from "../components/dialogform";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snack from "../components/snackbar";
import AlertDialog from "../components/confirmDialog";
import Tooltip from "@mui/material/Tooltip";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import Student from "./student";
import { createStudent, fetchStudent } from "../redux/studentSlice";

class StudentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {},
      classList: [],
      studentList: [],
      openList: false,
      activeClass: {},
      modal: false,
      confirmDel: false, //confirm delete dialog open@close
      popup: false, //snackbar open@close
      popupContent: {
        //snackbar type & message
        severity: "",
        message: "",
      },
      alertContent: {
        // on confirm delete data
        message: "",
        button: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    this.props.fetchClassStudent();
    this.setState({ classList: this.props.classstudent.data });
  };
  togglesnack = (snacktype) => {
    this.setState({ popup: !this.state.popup });
    if (snacktype == "delete") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Class deleted successfully",
        },
      });
    } else if (snacktype == "submit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Class submitted successfully",
        },
      });
    } else if (snacktype == "edit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Class edited successfully",
        },
      });
    } else if (snacktype == "error") {
      this.setState({
        popupContent: {
          severity: "error",
          message: "Error: please make sure the data are valid",
        },
      });
    } else if (snacktype == "duplicate") {
      this.setState({
        popupContent: {
          severity: "error",
          message: "Error: Class already existed",
        },
      });
    } else if (snacktype == "nonexist") {
      this.setState({
        popupContent: {
          severity: "error",
          message: "Error: please make sure the class exist",
        },
      });
    }
  };
  handleStudentlist = (clStudent) => {
    this.props.fetchStudent(clStudent.name);
    this.setState({
      activeClass: clStudent,
      openList: true,
    });
  };
  handlecreateClass = () => {
    const item = { name: "" };
    this.setState({ activeItem: item, modal: !this.state.modal }); //open modal
  };
  handleeditClass = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal }); // open moda
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmitItem = (classItem, studentItem) => {
    this.toggle();
    if (classItem.id) {
      this.props.updateClassStudent(classItem).then((res) => {
        if (res.error !== undefined) {
          this.togglesnack("error");
          return;
        }
        this.togglesnack("edit");
      });
    } else {
      const newClassItem = {
        ...classItem,
        created_by: this.props.auth.data.user.email,
      };
      if (newClassItem.name == "") {
        //import data from excel
        this.props.createStudent(studentItem).then((res) => {
          if (res.payload !== undefined) {
            if (res.payload.code == "23503") {
              this.togglesnack("nonexist");
              return;
            }
            this.togglesnack("error");
            return;
          }
          this.togglesnack("submit");
        });
      } else {
        this.props.createClassStudent([newClassItem]).then((res) => {
          if (res.payload !== undefined) {
            if (res.payload.code == "23505") {
              this.togglesnack("duplicate");
              return;
            }
            this.togglesnack("error");
            return;
          }
          this.props.createStudent(studentItem).then((res) => {
            if (res.payload !== undefined) {
              this.togglesnack("error");
              return;
            }
            this.togglesnack("submit");
          });
        });
      }
    }
  };
  handleDelete = (item) => {
    this.setState({
      activeItem: item,
      confirmDel: !this.state.confirmDel,
      alertContent: {
        message:
          "This action cannot be undone. All data related to this class including the student list will be deleted",
        button: "Class",
      },
    });
  };
  handleDeleteItem = (item) => {
    this.handleDelete(); // close the alert
    item = this.state.activeItem;
    try {
      this.props.deleteClassStudent(item.id).then(() => {
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };
  renderclasstable = () => {
    const classStudent = this.props.classstudent.data;
    return (
      <div>
        {classStudent
          ? classStudent.map((clStudent) => (
              <Accordion key={clStudent.id} >
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                  <Typography>Class {clStudent.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ textAlign: "justify", fontSize: 14 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                  <AccordionActions>
                    {clStudent.created_by == this.props.auth.data.user.email ? (
                      <Stack direction="row" spacing={1}>
                        <Tooltip title={"Student List"} arrow>
                          <IconButton
                            sx={{ padding: 0 }}
                            color="primary"
                            onClick={() => this.handleStudentlist(clStudent)}
                          >
                            <PeopleIcon fontSize="medium" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"edit"} arrow>
                          <IconButton
                            sx={{ padding: 0 }}
                            color="secondary"
                            onClick={() => this.handleeditClass(clStudent)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"delete"} arrow>
                          <IconButton
                            sx={{ padding: 0 }}
                            color="error"
                            onClick={() => this.handleDelete(clStudent)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    ) : (
                      <Stack direction="row">
                        <Tooltip title={"Student List"} arrow>
                          <IconButton
                            sx={{ padding: 0 }}
                            color="primary"
                            onClick={() => this.handleStudentlist(clStudent)}
                          >
                            <PeopleIcon fontSize="medium" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={"Author: " + clStudent.created_by}
                          arrow
                        >
                          <IconButton color="secondary">
                            <ContactPageIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    )}
                  </AccordionActions>
                </AccordionDetails>
              </Accordion>
            ))
          : null}
      </div>
    );
  };

  render() {
    return (
      <Box sx={{ minWidth: 275 }}>
        {this.state.modal ? (
          <DialogForm
            toggle={this.toggle}
            activeItem={this.state.activeItem}
            onSave={this.handleSubmitItem}
            flag="class"
          />
        ) : null}
        <Card variant="outlined" sx={{ padding: 2 }}>
          <CardHeader
            title={
              <div>
                Class
                <IconButton color="primary" onClick={this.handlecreateClass}>
                  <AddBoxIcon fontSize="medium" />
                </IconButton>
              </div>
            }
            sx={{ textAlign: "start", margin: 2 }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>{this.renderclasstable()}</Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                {this.state.openList ? (
                  <Student
                    activeClass={this.state.activeClass}
                    studentList={this.props.student}
                  />
                ) : null}
              </Grid>
            </Grid>
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
  classstudent: state.classstudent,
  student: state.student,
});

const mapDispatchToProps = (dispatch) => ({
  fetchClassStudent: (email) => dispatch(fetchClassStudent(email)),
  createClassStudent: (data) => dispatch(createClassStudent(data)),
  updateClassStudent: (data) => dispatch(updateClassStudent(data)),
  deleteClassStudent: (id) => dispatch(deleteClassStudent(id)),
  createStudent: (data) => dispatch(createStudent(data)),
  fetchStudent: (classname) => dispatch(fetchStudent(classname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentClass);
