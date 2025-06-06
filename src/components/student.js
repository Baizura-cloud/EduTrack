import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snack from "../components/snackbar";
import AlertDialog from "../components/confirmDialog";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import StudentForm from "./studentform";
import Studentfileupload from "./studentfileupload";
import {
  createStudent,
  deleteStudent,
  fetchStudent,
  updateStudent,
} from "../redux/studentSlice";
import {
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStudent: {},
      toggleForm: false,
      toggleFileUpload: false,
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
  componentDidMount() {}
  refreshList = () => {
    const { activeClass } = this.props;
    this.props.fetchStudent(activeClass.name);
  };
  toggleform = () => {
    this.setState({ toggleForm: !this.state.toggleForm }); // show/hide form
  };
  togglefileupload = () => {
    this.setState({ toggleFileUpload: !this.state.toggleFileUpload });
  };
  togglesnack = (snacktype) => {
    this.setState({ popup: !this.state.popup });
    if (snacktype == "delete") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Student deleted successfully",
        },
      });
    } else if (snacktype == "submit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Student submitted successfully",
        },
      });
    } else if (snacktype == "edit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Student edited successfully",
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
          message: "Error: please make sure the IC number are not duplicate",
        },
      });
    }
  };

  handleimportFile = () => {
    this.setState({ toggleFileUpload: !this.state.toggleFileUpload });
  };

  handlecreateStudent = () => {
    const item = { name: "", ic: "" };
    this.setState({
      activeStudent: item,
      toggleForm: !this.state.toggleForm,
    }); //open drawer
  };
  handleedit = (item) => {
    this.setState({
      activeStudent: item,
      toggleForm: !this.state.toggleForm,
    }); //open drawer
  };
  handleDelete = (item) => {
    this.setState({
      activeStudent: item,
      confirmDel: !this.state.confirmDel,
      alertContent: {
        message:
          "This action cannot be undone. All data related to this student will be deleted",
        button: "Student",
      },
    });
  };

  handleDeleteItem = (item) => {
    this.handleDelete(); // close the alert
    item = this.state.activeStudent;
    try {
      this.props.deleteStudent(item.id).then((data) => {
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };
  handleSubmitItem = (item) => {
    this.toggleform();
    if (item.id) {
      //update a student
      this.props.updateStudent(item).then(() => {
        this.togglesnack("edit");
      });
    } else {
      const arrItem = item.map((it) => ({
        ...it,
        class: this.props.activeClass.name,
      }));
      this.props.createStudent(arrItem).then((res) => {
        if (res.error) {
          this.togglesnack("duplicate");
        } else {
          this.togglesnack("submit");
        }
      });
    }
  };
  handleSubmitFile = (item) =>{
    this.togglefileupload()
    const arrItem = item.map((it) => ({
      ...it,
      class: this.props.activeClass.name,
    }));
    this.props.createStudent(arrItem).then((res) => {
      if (res.error) {
        this.togglesnack("duplicate");
      } else {
        this.togglesnack("submit");
      }
    });
  }

  renderStudentList = (data, loading) => {
    return (
      <>
        {loading ? (
          <CardContent>
            <CircularProgress />
          </CardContent>
        ) : (
          <CardContent>
            <TableContainer>
              <Table stickyHeader sx={{ minWidth: 300 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">
                      Identification Card No. (IC)
                    </TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    ? data.map((student) => {
                        return (
                          <TableRow
                            key={student.id}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {student.name}
                            </TableCell>
                            <TableCell align="right">{student.ic}</TableCell>
                            <TableCell align="right">
                              <Tooltip title={"edit"} arrow>
                                <IconButton
                                  onClick={() => this.handleedit(student)}
                                >
                                  <EditIcon color="secondary" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={"delete"} arrow>
                                <IconButton
                                  onClick={() => this.handleDelete(student)}
                                >
                                  <DeleteIcon color="error" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
      </>
    );
  };

  render() {
    const { studentList } = this.props;
    const { data, loading } = studentList;
    return (
      <>
        <CardHeader
          title={"Student"}
          sx={{ textAlign: "start" }}
          action={
            this.state.toggleForm || this.state.toggleFileUpload ? null : (
              <div align="right">
                <IconButton color="primary" onClick={this.handlecreateStudent}>
                  <AddBoxIcon fontSize="medium" />
                </IconButton>
                <IconButton color="primary" onClick={this.handleimportFile}>
                  <FileUploadIcon fontSize="medium" />
                </IconButton>
              </div>
            )
          }
        />
        {this.state.toggleForm ? (
          <StudentForm
            toggle={this.toggleform}
            activeItem={this.state.activeStudent}
            onSave={this.handleSubmitItem}
          />
        ) : null}
        {this.state.toggleFileUpload ? (
          <Studentfileupload
            toggle={this.togglefileupload}
            onSave={this.handleSubmitFile}
          />
        ) : null}
        {!this.state.toggleForm && !this.state.toggleFileUpload
          ? this.renderStudentList(data, loading)
          : null}
        {this.state.confirmDel ? (
          <AlertDialog
            activeItem={this.state.activeStudent}
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
  student: state.student,
});
const mapDispatchToProps = (dispatch) => ({
  fetchStudent: (classname) => dispatch(fetchStudent(classname)),
  deleteStudent: (id) => dispatch(deleteStudent(id)),
  createStudent: (data) => dispatch(createStudent(data)),
  updateStudent: (data) => dispatch(updateStudent(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Student);
