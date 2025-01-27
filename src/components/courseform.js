import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { fetchClassStudent } from "../redux/classSlice";
import { connect } from "react-redux";

class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: false,
      error1: false,
      tagClass: [],
      optiontype: [
        "Language",
        "Mathematic",
        "Science",
        "Sport",
        "Religion/moral",
        "Conventional",
        "General",
        "Art",
      ],
    };
  }
  componentDidMount() {
    this.handleAutocomplete();
  }
  handleAutocomplete = () => {
    this.props.fetchClassStudent();
    const newArray = [];
    const allfetch = this.props.classstudent.data;
    for (var i = 0; i < allfetch.length; i++) {
      newArray.push(allfetch[i].name)
    }
    this.setState({ tagClass: newArray })
  }
  handleChange = (e, tag) => {
    let { name, value } = e.target;
    if (e.target.name == "name") {
      if (e.target.value == "") {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
    } 

    if (!e.target.type) {
      if (Array.isArray(tag)) {
        const activeItem = { ...this.state.activeItem, tagclass: tag };
        this.setState({ activeItem });
      }
      if (typeof tag === "string") {
        const activeItem = { ...this.state.activeItem, type: tag };
        this.setState({ activeItem });
      }
    } else {
      const activeItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem });
    }
  };

  handlesubmit = () => {
    const item = this.state.activeItem;
    if (item.name == "" || null) {
      this.setState({ error: true });
      return;
    }
    if (item.type == "" || null) {
      this.setState({ error1: true });
      return;
    }
     this.props.onSave(item);
  };

  render() {
    const { activeItem } = this.props;

    return (
      <>
        <CardHeader title={"Course"} />
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>Name</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl error={this.state.error} fullWidth={true}>
                <OutlinedInput
                  type="text"
                  id="course-name"
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

          <Grid container spacing={1} sx={{ paddingBottom: 3 }}>
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>Credit</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl  fullWidth={true}>
                <OutlinedInput
                  type="number"
                  id="course-credit"
                  name="credit"
                  defaultValue={activeItem.credit}
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={1} >
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>Type</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
            
              <Autocomplete
                id="course-type"
                name="type"
                disablePortal
                options={this.state.optiontype}
                sx={{ width: 375 }}
                renderInput={(params) =>
                <FormControl error={this.state.error1} fullWidth={true}> 
                <TextField {...params} error={this.state.error1} />
                <FormHelperText id="my-helper-text">
                  {this.state.error1 ? "Must not empty" : " "}
                </FormHelperText>
                </FormControl>
                }
                onChange={(event, tag) => this.handleChange(event, tag)}
                defaultValue={
                  activeItem.type !== null ? activeItem.type : undefined
                }
              />
              
              
            </Grid>
          </Grid>

          <Grid container spacing={1} marginBottom={3}>
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>Class</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Autocomplete
                multiple
                id="tag-class"
                name="class"
                onChange={(event, tag) => this.handleChange(event, tag)}
                options={this.state.tagClass}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                defaultValue={
                  activeItem.tagclass !== null ? activeItem.tagclass : undefined
                }
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  );
                }}
                style={{ width: 375 }}
                renderInput={(params) => <TextField {...params} />}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  classstudent: state.classstudent,
});

const mapDispatchToProps = (dispatch) => ({
  fetchClassStudent: () => dispatch(fetchClassStudent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseForm);
