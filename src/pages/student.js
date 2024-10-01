import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import FormDrawer from "../components/formdrawer";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snack from "../components/snackbar";
import AlertDialog from "../components/confirmDialog";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import {
  createStudent,
  deleteStudent,
  fetchStudent,
  updateStudent,
} from "../redux/studentSlice";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStudent: {},
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
  toggle = () => {
    this.setState({ toggleDrawer: !this.state.toggleDrawer }); //function to be use to close drawer
  };
  togglesnack = (snacktype) => {
    this.setState({ popup: !this.state.popup });
    if (snacktype == "delete") {
      this.setState({popupContent:{severity: "success",message: "Student deleted successfully"}});
    } else if (snacktype == "submit") {
      this.setState({popupContent:{severity:"success",message:"Student submitted successfully"}});
    } else if (snacktype == "edit") {
      this.setState({popupContent:{severity:"success",message:"Student edited successfully"}});
    } else if (snacktype == "error") {
      this.setState({popupContent:{severity:"error",message:"Error: please make sure the data are valid"}});
    } else if (snacktype == "duplicate") {
      this.setState({popupContent:{severity:"error",message:"Error: please make sure the IC number are not duplicate"}});
    }
  };
  handlecreateStudent = () => {
    const item = { name: "", ic: "" };
    this.setState({
      activeStudent: item,
      toggleDrawer: !this.state.toggleDrawer,
    }); //open drawer
  };
  handleedit = (item) => {
    this.setState({
      activeStudent: item,
      toggleDrawer: !this.state.toggleDrawer,
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
        this.refreshList();
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };
  handleSubmitItem = (item) => {
    this.toggle();
    console.log(item);
    if (item.id) {
      this.props.updateStudent(item).then(() => {
        this.refreshList();
        this.togglesnack("edit");
      });
    } else {
      const newItem = {
        ...item,
        class: this.props.activeClass.name,
      };
      this.props.createStudent(newItem).then((res) => {
        if(res.payload){
          this.togglesnack('duplicate')
        }else{
          this.refreshList();
          this.togglesnack("submit");
        }
      });
    }
  };

  render() {
    const { studentList } = this.props;
    const { data, loading } = studentList;
    return (
      <Box sx={{ width: "100%" }}>
        {this.state.toggleDrawer ? (
          <FormDrawer
            toggle={this.toggle}
            activeItem={this.state.activeStudent}
            onSave={this.handleSubmitItem}
            flag="student"
          />
        ) : null}
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Card>
            <CardHeader
              title={"Student"}
              sx={{ textAlign: "start" }}
              action={
                <div align="right">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={this.handlecreateStudent}
                  >
                    New Student
                  </Button>
                </div>
              }
            />
            {loading ? (
              <CardContent>
                <CircularProgress />
              </CardContent>
            ) : (
              <CardContent>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small">
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
          </Card>
        </Paper>
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
      </Box>
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
