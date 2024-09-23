import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export default class BulletinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: false,
      error1: false,
    };
  }
  componentDidMount(){
  }
  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    if (e.target.name == "title") {
      if (e.target.value == "") {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
    } else if (e.target.name == "description") {
      if (e.target.value == "") {
        this.setState({ error1: true });
      } else {
        this.setState({ error: false });
      }
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  handlesubmit = () =>{
    const item = this.state.activeItem
    if(item.title == '' || null){
      this.setState({error:true})
      return
    }
    if(item.description == ''|| null){
      this.setState({error1:true})
      return
    }
    this.props.onSave(item)
  }

  render() {
    const {activeItem } = this.props;

    return (
      <Card>
        <CardHeader title={"Bulletin"} />
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>Title</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl error={this.state.error} fullWidth={true}>
                <OutlinedInput
                  type="text"
                  id="todo-title"
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
              <InputLabel sx={{ padding: 2 }}>Details</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl error={this.state.error1} fullWidth={true}>
                <OutlinedInput
                  type="text"
                  id="todo-details"
                  name="details"
                  defaultValue={activeItem.details}
                  onChange={this.handleChange}
                />
                <FormHelperText id="my-helper-text">
                  {this.state.error1 ? "Must not empty" : " "}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          {/* <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>Status</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl fullWidth={true}>
                <FormControlLabel
                  control={<Checkbox defaultChecked={activeItem.completed} />}
                  label="completed"
                  name="completed"
                  
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
          </Grid> */}
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <Button
            variant="outlined"
            color="success"
            // onClick={() => onSave(this.state.activeItem)}
            onClick={this.handlesubmit}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}
