import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import {
  TextField,
  Autocomplete,
  CardActions,
  CardContent,
  CardHeader,
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export default class ExamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: false,
      error1: false,
      error2: false,
      year: "",
      yearList: ["2023", "2024", "2025", "2026"],
    };
  }
  handleChange = (e, year) => {
    let { name, value } = e.target;
    if (e.target.name === "title") {
      if (e.target.value === "") {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
    }
    if (year) {
        this.setState({ error1: false });
        const activeItem = { ...this.state.activeItem, year };
        this.setState({ activeItem });
      } else if (year === null) {
        this.setState({ error1: true });
        const activeItem = { ...this.state.activeItem, year };
        this.setState({ activeItem });
      } else {
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
      }
  };

  handlesubmit = () => {
    const item = this.state.activeItem;
    if (item.title === "") {
      this.setState({ error: true });
      return;
    }
    if (item.year === "" || item.year === null) {
      this.setState({ error1: true });
      return;
    }
    this.props.onSave(item);
  };

  render() {
    const { activeItem } = this.props;
    return (
      <>
        <CardHeader title={"Exam"} />
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>Title</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl error={this.state.error} fullWidth={true}>
                <OutlinedInput
                  type="text"
                  id="exam-title"
                  name="title"
                  defaultValue={activeItem.title}
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
              <Autocomplete
                disablePortal
                options={this.state.yearList}
                defaultValue={activeItem.year}
                onChange={(event, year) => this.handleChange(event, year)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <FormControl error={this.state.error1} fullWidth={true}>
                    <TextField {...params} error={this.state.error1}/>
                    <FormHelperText>
                      {this.state.error1 ? "Must not empty" : " "}
                    </FormHelperText>
                  </FormControl>
                )}
                style={{ width: 200 }}
              />
            </Grid>
          </Grid>
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
