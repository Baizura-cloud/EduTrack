import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardHeader,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import Tooltip from "@mui/material/Tooltip";
import CommentIcon from "@mui/icons-material/Comment";
import {
  createCourse,
  deleteCourse,
  fetchCourse,
  updateCourse,
} from "../redux/courseSlice";
import { connect } from "react-redux";
import FormDrawer from "../components/formdrawer";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snack from "../components/snackbar";
import AlertDialog from "../components/confirmDialog";
import Grid from "@mui/material/Grid2";
import { fetchmultipleStudent } from "../redux/studentSlice";
class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {},
      courseList: [],
      openClass: false,
      toggleDrawer: false,
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
    this.setState({ activeItem: item, toggleDrawer: !this.state.toggleDrawer }); //open drawer
  };
  handleeditcourse = (item) => {
    this.setState({ activeItem: item, toggleDrawer: !this.state.toggleDrawer }); //open drawer
  };
  toggle = () => {
    this.setState({ toggleDrawer: !this.state.toggleDrawer }); //function to be use to close drawer
  };
  handleSubmitItem = (item) => {
    this.toggle();
    if (item.id) {
      this.props.updateCourse(item).then(() => {
        this.refreshList();
        this.togglesnack("edit");
      });
    } else {
      const newItem = { ...item, admin: this.props.auth.data.user.email };
      this.props.createCourse([newItem]).then(() => {
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
      this.props.deleteCourse(item.id).then(() => {
        this.refreshList();
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
  rendercourseCard = () => {
    const allcourse = this.props.course.data;
    return (
      <>
        {allcourse
          ? allcourse.map((course) => (
              <Card
                key={course.id}
                variant="outlined"
                sx={{ width: 200, height: 300, textAlign: "start" }}
              >
                <CardHeader
                  action={
                    course.admin == this.props.auth.data.user.email ? (
                      <Stack direction="row">
                        <Tooltip title={"edit"} arrow>
                          <IconButton
                            color="secondary"
                            onClick={() => this.handleeditcourse(course)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"delete"} arrow>
                          <IconButton
                            color="error"
                            onClick={() => this.handleDelete(course)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    ) : (
                      <Stack direction="row">
                        <Tooltip title={"Author: " + course.admin} arrow>
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
                    {course.name}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {course.type} Class(es)
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {course.credit} Credit
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.handleClass(course)}
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

  rendersCourseDetails = () => {
    const details = this.state.activeDetails;
    const { data, loading } = this.props.student;

    return (
      <>
        <Card variant="outlined" sx={{ textAlign: "start" }}>
          <CardHeader title={details.name} subheader={details.type} />
          {loading ? (
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "10vh", // Adjust height as needed
                }}
              >
                <CircularProgress size="3rem" />
              </Box>
            </CardContent>
          ) : (
            <CardContent>
              {details.tagclass
                ? details.tagclass.map((name) => {
                    return (
                      <Accordion key={details.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          Class {name}
                        </AccordionSummary>
                        <AccordionDetails>
                          <List>
                            {data
                              ? data.map((stud) => {
                                  return stud.class === name ? (
                                    <ListItem
                                      key={stud.id}
                                      secondaryAction={
                                        <IconButton edge="end">
                                          <CommentIcon color="secondary" />
                                        </IconButton>
                                      }
                                      disablePadding
                                    >
                                      <ListItemText primary={stud.name} />
                                    </ListItem>
                                  ) : null;
                                })
                              : null}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })
                : null}
            </CardContent>
          )}
        </Card>
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
            flag="course"
          />
        ) : null}
        <Card variant="outlined" sx={{ padding: 2 }}>
          <CardHeader
            title="Course"
            sx={{ textAlign: "start", margin: 2 }}
            action={
              <div align="right">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={this.handlecreateCourse}
                >
                  New Course
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
                  {this.rendercourseCard()}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                {this.state.openList ? this.rendersCourseDetails() : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Course);
