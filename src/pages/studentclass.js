import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Stack, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  createClassStudent,
  deleteClassStudent,
  fetchClassStudent,
  updateClassStudent,
} from "../redux/classSlice";
import { connect } from "react-redux";
import FormDrawer from "../components/formdrawer";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snack from "../components/snackbar";
import AlertDialog from "../components/confirmDialog";
import Tooltip from "@mui/material/Tooltip";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import {
  createStudent,
  deleteStudent,
  fetchStudent,
} from "../redux/studentSlice";

class StudentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {},
      classList: [],
      openList: false,
      studentList: [],
      activeStudent: {},
      activeClass: {},
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

  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    this.props.fetchClassStudent(this.props.auth.data.user.email);
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
    }
  };
  handleStudentlist = (clStudent) => {
    this.props.fetchStudent(clStudent.name);
    this.setState({
      activeClass: clStudent,
      studentList: this.props.student.data,
      openList: true,
    });
  };
  handlecreateClass = () => {
    const item = { name: "" };
    this.setState({ activeItem: item, toggleDrawer: !this.state.toggleDrawer }); //open drawer
  };
  handleeditClass = (item) => {
    this.setState({ activeItem: item, toggleDrawer: !this.state.toggleDrawer }); //open drawer
  };
  toggle = () => {
    this.setState({ toggleDrawer: !this.state.toggleDrawer }); //function to be use to close drawer
  };
  handleSubmitItem = (classItem, studentItem) => {
    this.toggle();
    if (classItem.id) {
      this.props.updateClassStudent(classItem).then(() => {
        this.refreshList();
        this.togglesnack("edit");
      });
    } else {
      const newClassItem = {
        ...classItem,
        admin: this.props.auth.data.user.email,
      };
      console.log(newClassItem);
      console.log(studentItem);
      this.props.createClassStudent([newClassItem]).then(() => {
        this.props.createStudent(studentItem).then(() => {
          this.refreshList();
          this.togglesnack("submit");
        });
      });
    }
  };
  handleDelete = (item) => {
    //open modal confirm delete
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
        this.refreshList();
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };
  handleDeleteStudent = (item) => {
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
  handleDeleteStudentItem = (item) => {
    this.handleDelete(); // close the alert
    item = this.state.activeStudent;
    try {
      this.props.deleteStudent(item.id).then(() => {
        this.refreshList();
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };

  renderclassCard = () => {
    const classStudent = this.props.classstudent.data;
    return (
      <>
        {classStudent
          ? classStudent.map((clStudent) => (
              <Card
                key={clStudent.id}
                variant="outlined"
                sx={{ width: 200, height: 200 }}
              >
                <CardHeader
                  action={
                    clStudent.admin == this.props.auth.data.user.email ? (
                      <Stack direction="row">
                        <Tooltip title={"edit"} arrow>
                          <IconButton
                            color="secondary"
                            onClick={() => this.handleeditClass(clStudent)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"delete"} arrow>
                          <IconButton
                            color="error"
                            onClick={() => this.handleDelete(clStudent)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    ) : (
                      <Stack direction="row">
                        <Tooltip title={"created by " + clStudent.admin} arrow>
                          <IconButton color="secondary">
                            <ContactPageIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    )
                  }
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 16 }}
                  >
                    {clStudent.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.handleStudentlist(clStudent)}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
            ))
          : null}
      </>
    );
  };

  renderstudentCard = () => {
    const { student } = this.props;
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar>
            <Typography variant="h6">Student List</Typography>
          </Toolbar>
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
                {student
                  ? student.data.map((data) => {
                      return (
                        <TableRow
                          key={data.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {data.name}
                          </TableCell>
                          <TableCell align="right">{data.ic}</TableCell>
                          <TableCell align="right">
                            <Tooltip title={"edit"} arrow>
                              <IconButton>
                                <EditIcon color="secondary" />
                              </IconButton>
                              <IconButton
                                onClick={() => this.handleDeleteStudent(data)}
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
        </Paper>
      </Box>
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
            flag="class"
          />
        ) : null}
        <Card variant="outlined" sx={{ padding: 2 }}>
          <CardHeader
            title="Class"
            sx={{ textAlign: "start", margin: 2 }}
            action={
              <div align="right">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={this.handlecreateClass}
                >
                  New class
                </Button>
              </div>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  useFlexGap
                  sx={{ flexWrap: "wrap" }}
                >
                  {this.renderclassCard()}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                {this.state.openList ? this.renderstudentCard() : null}
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
  deleteStudent: (id) => dispatch(deleteStudent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentClass);
