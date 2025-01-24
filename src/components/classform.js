import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

class Classform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: false,
      error1: false,
      student: [],
    };
  }
  componentDidMount() {}
  handleAddDeleteStudent = (operation, index) => {
    if (operation == "add") {
      this.setState((prevstate) => ({
        student: [
          ...prevstate.student,
          { id: this.state.student.length + 1, name: "", ic: "", class: "" },
        ],
      }));
    } else if (operation == "delete") {
      this.setState((prevstate) => {
        const updateState = prevstate.student.filter(
          (items) => items.id !== index
        );
        return { student: updateState };
      });
    }
  };
  handleChange = (e, index) => {
    let { name, value } = e.target;
    if (e.target.name == "name") {
      if (e.target.value == "") {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
    }
    if (e.target.name == "sname") {
      const updatedStudent = [...this.state.student];
      updatedStudent[index].name = e.target.value;
      this.setState({ student: updatedStudent });
    } else if (e.target.name == "ic") {
      const updatedStudent = [...this.state.student];
      updatedStudent[index].ic = e.target.value;
      this.setState({ student: updatedStudent });
    } else {
      const activeItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem });
    }
  };
  handleclassname = (classname) => {
    // add class name to each student object
    const studentItem = this.state.student;
    const newStudentItem = studentItem.map((obj) => {
      return {
        ...obj,
        class: classname,
      };
    });

    const item = newStudentItem.map((obj) => {
      // remove id from each student object
      const { id, ...data } = obj;
      return data;
    });
    return item;
  };
  handlesubmit = () => {
    // if (this.state.importdata) {
    //   const studentItem = this.state.importdata.map((student) => {
    //     const { Nama, KP, Kelas } = student;
    //     const newstudent = { class: Kelas, name: Nama, ic: KP };
    //     return newstudent;
    //   });
    //   console.log(this.state.student)
    //   const classItem = this.state.activeItem;
    //   this.props.onSave(classItem, studentItem)
    // } else {
    const classItem = this.state.activeItem;
    const studentItem = this.handleclassname(classItem.name);

    this.props.onSave(classItem, studentItem);
    // }
  };

  render() {
    const { activeItem } = this.props;

    return (
      <>
        <CardHeader title={"Class"} />
        <CardContent>
          <>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <InputLabel sx={{ padding: 2 }}>Class Name</InputLabel>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <FormControl error={this.state.error} fullWidth={true}>
                  <OutlinedInput
                    type="text"
                    id="class-name"
                    name="name"
                    defaultValue={activeItem.name}
                    onChange={this.handleChange}
                  />
                  <FormHelperText id="my-helper-text">
                    {this.state.error ? "Must not empty" : " "}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            {activeItem.name == "" ? (
              <>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Student
                      <IconButton
                        onClick={() => this.handleAddDeleteStudent("add")}
                      >
                        <AddCircleIcon color="primary" />
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
                {this.state.student.map((data, index) => {
                  return (
                    <>
                      <Grid container spacing={1}>
                        <Grid size={{ xs: 12, md: 3 }}>
                          <InputLabel sx={{ padding: 2 }}>Name</InputLabel>
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                          <FormControl
                            error={this.state.error}
                            fullWidth={true}
                          >
                            <OutlinedInput
                              type="text"
                              id="student-name"
                              name="sname"
                              onChange={(e) => this.handleChange(e, index)}
                            />
                            <FormHelperText id="my-helper-text">
                              {this.state.error ? "Must not empty" : " "}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid size={{ xs: 12, md: 3 }}>
                          <InputLabel sx={{ padding: 2 }}>IC No.</InputLabel>
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                          <FormControl
                            error={this.state.error}
                            fullWidth={true}
                          >
                            <OutlinedInput
                              type="text"
                              id="student-ic"
                              name="ic"
                              onChange={(e) => this.handleChange(e, index)}
                            />
                            <FormHelperText id="my-helper-text">
                              {this.state.error ? "Must not empty" : " "}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 1 }}>
                          <IconButton
                            onClick={() =>
                              this.handleAddDeleteStudent("delete", index)
                            }
                          >
                            <RemoveCircleIcon color="error" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </>
            ) : null}
          </>
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <Button
            variant="contained"
            color="success"
            onClick={this.handlesubmit}
          >
            Save
          </Button>
        </CardActions>
      </>
    );
  }
}

export default Classform;
