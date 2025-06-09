import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Autocomplete,
  CardActions,
  CardContent,
  CardHeader,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";

class Classform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: false,
      error1: false,
      year: "",
      yearList: [2023, 2024, 2025, 2026],
    };
  }
  handleChange = (e, index) => {
    let { name, value } = e.target;
    if (name == "name") {
      if (value == "") {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
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
    const classItem = {
      ...this.state.activeItem,
      year: this.state.year,
    };
    this.props.onSave(classItem);
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

            <Grid container spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <InputLabel sx={{ padding: 2 }}>Year</InputLabel>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <FormControl error={this.state.error} fullWidth={true}>
                  <Autocomplete
                    value={activeItem.year ? activeItem.year : this.state.year}
                    options={this.state.yearList}
                    getOptionLabel={(option) => `${option}`}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(event, newValue) => {
                      this.setState({ year: newValue });
                    }}
                  />
                  <FormHelperText id="my-helper-text">
                    {this.state.error ? "Must not empty" : " "}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
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
