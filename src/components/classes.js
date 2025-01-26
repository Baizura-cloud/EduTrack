import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  createClassStudent,
  deleteClassStudent,
  fetchClassStudent,
  updateClassStudent,
} from "../redux/classSlice";
import { connect } from "react-redux";
import DialogForm from "./dialogform";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snack from "./snackbar";
import AlertDialog from "./confirmDialog";
import Tooltip from "@mui/material/Tooltip";
import AttributionIcon from "@mui/icons-material/Attribution";
import { createStudent, fetchStudent } from "../redux/studentSlice";

class Classes extends React.Component {
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
  stoggle = () => {
    this.setState({ openList: !this.state.openList });
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmitItem = (classItem, studentItem) => {
    this.toggle();
    if (studentItem) {
      const newClassItem = {
        ...classItem,
        created_by: this.props.auth.data.user.email,
      };
      this.props.createClassStudent([newClassItem]).then((res) => {
        if (res.error !== undefined) {
          this.togglesnack("error");
          return;
        }
        this.props.createStudent(studentItem).then((res) => {
          if (res.error !== undefined) {
            this.togglesnack("error");
            return;
          }
          this.togglesnack("submit");
        });
      });
    }
    if (classItem.id) {
      this.props.updateClassStudent(classItem).then((res) => {
        //update class
        if (res.error !== undefined) {
          this.togglesnack("error");
          return;
        }
        this.togglesnack("edit");
      });
    } else {
      //create class
      const newClassItem = {
        ...classItem,
        created_by: this.props.auth.data.user.email,
      };
      this.props.createClassStudent(newClassItem).then((res) =>{
        if(res.error !== undefined){
          this.togglesnack("error")
          return
        }
        this.togglesnack("submit");
      })
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

  rendertable = () => {
    const classStudent = this.props.classstudent.data;
    return (
      <TableContainer>
        <Table sx={{ minWidth: 300 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Year</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classStudent.map((clStudent) => (
              <TableRow
                key={clStudent.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {clStudent.name}
                </TableCell>
                <TableCell align="left">{clStudent.year}</TableCell>
                <TableCell align="left">
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
                      <Tooltip title={"Author: " + clStudent.created_by} arrow>
                        <IconButton
                          color="secondary"
                          sx={{ padding: 0, marginLeft: 1 }}
                        >
                          <AttributionIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  render() {
    return (
      <>
        <Card variant="outlined" sx={{ minWidth: 275 }}>
          <CardHeader
            title="Class"
            subheader="List of classes"
            action={
              <div align="right">
                <IconButton color="primary" onClick={this.handlecreateClass}>
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </div>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12 }}>{this.rendertable()}</Grid>
            </Grid>
          </CardContent>
        </Card>
        {this.state.openList ? (
          <DialogForm
            toggle={this.stoggle}
            activeClass={this.state.activeClass}
            studentList={this.props.student}
            flag="student"
          />
        ) : null}
        {this.state.modal ? (
          <DialogForm
            toggle={this.toggle}
            activeItem={this.state.activeItem}
            onSave={this.handleSubmitItem}
            flag="class"
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

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
