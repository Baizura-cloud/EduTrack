import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  CardHeader,
  Stack,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import {
  createCourse,
  deleteCourse,
  fetchCourse,
  updateCourse,
} from "../redux/courseSlice";
import { connect } from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snack from "../components/snackbar";
import AlertDialog from "../components/confirmDialog";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AttributionIcon from "@mui/icons-material/Attribution";
import { fetchmultipleStudent } from "../redux/studentSlice";
import DialogForm from "./dialogform";
class Courselist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {},
      openClass: false,
      toggleDialog: false,
      activeDetails: {},
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
          "This action cannot be undone. All data related to this course will be deleted",
        button: "Course",
      },
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    this.props.fetchCourse();
  };
  togglesnack = (snacktype) => {
    this.setState({ popup: !this.state.popup });
    if (snacktype == "delete") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Course deleted successfully",
        },
      });
    } else if (snacktype == "submit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Course submitted successfully",
        },
      });
    } else if (snacktype == "edit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Course edited successfully",
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
  handlecreateCourse = () => {
    const item = { name: "", type: "", credit: 0, tagclass: [] };
    this.setState({ activeItem: item, toggleDialog: !this.state.toggleDialog }); //open drawer
  };
  handleeditcourse = (item) => {
    this.setState({ activeItem: item, toggleDialog: !this.state.toggleDialog }); //open drawer
  };
  toggle = () => {
    this.setState({ toggleDialog: !this.state.toggleDialog }); //function to be use to close drawer
  };
  handleSubmitItem = (item) => {
    this.toggle();
    if (item.id) {
      this.props.updateCourse(item).then(() => {
        this.togglesnack("edit");
      });
    } else {
      const newItem = { ...item, admin: this.props.auth.data.user.email };
      this.props.createCourse([newItem]).then(() => {
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
      this.props.deleteCourse(item.id).then(() => {
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };
  handleClass = (course) => {
    const tagclass = course.tagclass;
    this.props.fetchmultipleStudent(tagclass);
    this.setState({ activeDetails: course, openList: true });
  };
  rendertable = () => {
    const allcourses = this.props.course.data;
    return (
      <TableContainer>
        <Table sx={{ minWidth: 300 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Credit</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allcourses ? allcourses.map((course) => (
              <TableRow
                key={course.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {course.name}
                </TableCell>
                <TableCell align="left">{course.type}</TableCell>
                <TableCell align="left">{course.credit}</TableCell>
                <TableCell align="left">
                  {course.created_by == this.props.auth.data.user.email ? (
                    <Stack direction="row" spacing={1}>
                      {/* <Tooltip title={"Student List"} arrow>
                        <IconButton
                          sx={{ padding: 0 }}
                          color="primary"
                          onClick={() => this.handleStudentlist(course)}
                        >
                          <PeopleIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip title={"edit"} arrow>
                        <IconButton
                          sx={{ padding: 0 }}
                          color="secondary"
                          onClick={() => this.handleeditcourse(course)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"delete"} arrow>
                        <IconButton
                          sx={{ padding: 0 }}
                          color="error"
                          onClick={() => this.handleDelete(course)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  ) : (
                    <Stack direction="row">
                      {/* <Tooltip title={"Student List"} arrow>
                        <IconButton
                          sx={{ padding: 0 }}
                          color="primary"
                          onClick={() => this.handleStudentlist(course)}
                        >
                          <PeopleIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip title={"Author: " + course.created_by} arrow>
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
            )):null}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  render() {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" sx={{ padding: 2 }}>
          <CardHeader
            title="Course"
            subheader="List of courses"
            action={
              <div align="right">
                <IconButton color="primary" onClick={this.handlecreateCourse}>
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </div>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12 }}>
                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  useFlexGap
                  sx={{ flexWrap: "wrap" }}
                >
                  {this.rendertable()}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {this.state.toggleDialog ? (
          <DialogForm
            toggle={this.toggle}
            activeItem={this.state.activeItem}
            onSave={this.handleSubmitItem}
            flag="course"
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
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
  student: state.student,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCourse: () => dispatch(fetchCourse()),
  createCourse: (data) => dispatch(createCourse(data)),
  updateCourse: (data) => dispatch(updateCourse(data)),
  deleteCourse: (id) => dispatch(deleteCourse(id)),
  fetchmultipleStudent: (mulclassname) =>
    dispatch(fetchmultipleStudent(mulclassname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Courselist);
