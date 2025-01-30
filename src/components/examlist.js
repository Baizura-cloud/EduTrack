import React, { Component } from "react";
import {
  Tooltip,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  IconButton,
  Stack,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AttributionIcon from "@mui/icons-material/Attribution";
import { fetchExam, createExam, deleteExam } from "../redux/examSlice";
import { connect } from "react-redux";
import AlertDialog from "./confirmDialog";
export class Examlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examList: [],
      activeItem: {},
      modal: false,
      confirmDel: false,
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
    this.props.fetchExam();
  };
  togglesnack = (snacktype) => {
    this.setState({ popup: !this.state.popup });
    if (snacktype === "delete") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Class deleted successfully",
        },
      });
    } else if (snacktype === "submit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Class submitted successfully",
        },
      });
    } else if (snacktype === "edit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Class edited successfully",
        },
      });
    } else if (snacktype === "error") {
      this.setState({
        popupContent: {
          severity: "error",
          message: "Error: please make sure the data are valid",
        },
      });
    } else if (snacktype === "duplicate") {
      this.setState({
        popupContent: {
          severity: "error",
          message: "Error: Class already existed",
        },
      });
    } else if (snacktype === "nonexist") {
      this.setState({
        popupContent: {
          severity: "error",
          message: "Error: please make sure the class exist",
        },
      });
    }
  };
  handlecreateexam = () => {
    console.log("add");
  };
  handleDelete = (item) => {
    this.setState({
      activeItem: item,
      confirmDel: !this.state.confirmDel,
      alertContent: {
        message:
          "This action cannot be undone. All data related to this exam will be deleted",
        button: "Exam",
      },
    });
  };
  handleDeleteItem = (item) => {
    this.handleDelete(); // close the alert
    item = this.state.activeItem;
    try {
      this.props.deleteExam(item.id).then(() => {
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };
  rendertable = () => {
    const examList = this.props.exam.data;
    return (
      <TableContainer>
        <Table sx={{ minWidth: 300 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Year</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examList.map((exam) => (
              <TableRow
                key={exam.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {exam.title}
                </TableCell>
                <TableCell align="left">{exam.year}</TableCell>
                <TableCell align="left">
                  {exam.created_by === this.props.auth.data.user.email ? (
                    <Stack direction="row" spacing={1}>
                      <Tooltip title={"Student List"} arrow>
                        <IconButton
                          sx={{ padding: 0 }}
                          color="primary"
                          // onClick={() => this.handleClasslist(exam)}
                        >
                          <PeopleIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"edit"} arrow>
                        <IconButton
                          sx={{ padding: 0 }}
                          color="secondary"
                          // onClick={() => this.handleeditexam(exam)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"delete"} arrow>
                        <IconButton
                          sx={{ padding: 0 }}
                          color="error"
                          onClick={() => this.handleDelete(exam)}
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
                          // onClick={() => this.handleClasslist(clStudent)}
                        >
                          <PeopleIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Author: " + exam.created_by} arrow>
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
            title="Exam"
            subheader="List of exam"
            action={
              <div align="right">
                <IconButton color="primary" onClick={this.handlecreateexam}>
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </div>
            }
          />
          <CardContent>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 12 }}>{this.rendertable()}</Grid2>
            </Grid2>
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  exam: state.exam,
});

const mapDispatchToProps = (dispatch) => ({
  fetchExam: () => dispatch(fetchExam()),
  deleteExam: (id) => dispatch(deleteExam(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Examlist);
