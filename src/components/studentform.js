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
  OutlinedInput,
  Typography,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";

export default class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: false,
      error1: false,
      student: [],
    };
  }
  handleChange = (e, index) => {
    let { name, value } = e.target;
    if (name === "sname") {
      const updatedStudent = [...this.state.student];
      updatedStudent[index].name = value;
      this.setState({ student: updatedStudent });
    } else if (name === "sic") {
      const updatedStudent = [...this.state.student];
      updatedStudent[index].ic = value;
      this.setState({ student: updatedStudent });
    } else {
      const activeItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem });
    }
  };

  handlesubmit = () => {
    const item = this.state.activeItem;
    if (item.name === "" || null) {
      this.setState({ error: true });
      return;
    }
    if (item.ic === "" || null) {
      this.setState({ error1: true });
      return;
    }

    if (!item.id) {
      const newState = this.state.student.map((obj) => {
        //remove id from dynamic field value
        const { id, ...data } = obj;
        return data;
      });
      newState.push(item); //combine
      this.props.onSave(newState);
    } else {
      this.props.onSave(item);
    }
  };
  handleAddDeleteStudent = (operation, index) => {
    //add dynamic field
    if (operation === "add") {
      this.setState((prevstate) => ({
        student: [
          ...prevstate.student,
          { id: this.state.student.length + 1, name: "", ic: "" },
        ],
      }));
    } else if (operation === "delete") {
      console.log(index)
      this.setState((prevstate) => {
        const updateState = prevstate.student.filter(
          (items) => items.id !== index.id
        );
        return { student: updateState };
      });
    }
  };

  render() {
    const { activeItem, toggle } = this.props;

    return (
      <>
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>Name</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl error={this.state.error} fullWidth={true}>
                <OutlinedInput
                  type="text"
                  id="student-name"
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

          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>IC No.</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl error={this.state.error1} fullWidth={true}>
                <OutlinedInput
                  type="number"
                  id="student-ic"
                  name="ic"
                  defaultValue={activeItem.ic}
                  onChange={this.handleChange}
                  sx={{
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        display: "none",
                      },
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                  }}
                />
                <FormHelperText id="my-helper-text">
                  {this.state.error1 ? "Must not empty" : " "}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          {this.state.activeItem.id ? null : (
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <IconButton
                    onClick={() => this.handleAddDeleteStudent("add")}
                  >
                    <AddCircleIcon color="primary" />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
          )}
          {this.state.student.length !== 0
            ? this.state.student.map((index) => {
                return (
                  <>
                    <Grid container spacing={1}>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <InputLabel sx={{ padding: 2 }}>Name</InputLabel>
                      </Grid>
                      <Grid size={{ xs: 12, md: 8 }}>
                        <FormControl error={this.state.error} fullWidth={true}>
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
                        <FormControl error={this.state.error} fullWidth={true}>
                          <OutlinedInput
                            type="text"
                            id="student-ic"
                            name="sic"
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
              })
            : null}
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <Button variant="contained" color="error" onClick={toggle}>
            Cancel
          </Button>
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
