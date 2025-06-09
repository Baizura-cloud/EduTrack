import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  CardActions,
  CardContent,
  CardHeader,
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { fetchotherprofile } from "../redux/otherprofileSlice";
import { connect } from "react-redux";

class BulletinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: false,
      error0: false,
      error1: false,
      tagProfile: [],
      btype: ["Announcement", "Event"],
    };
  }

  handleChange = (e, btype) => {
    let { name, value } = e.target;

    if (name === "title") {
      if (value === "") {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
    }  else if (name === "details") {
      if (value === "") {
        this.setState({ error1: true });
      } else {
        this.setState({ error1: false });
      }
    }
    if (btype) {
      this.setState({ error0: false });
      const activeItem = { ...this.state.activeItem, btype };
      this.setState({ activeItem });
    } else if (btype === null) {
      this.setState({ error0: true });
      const activeItem = { ...this.state.activeItem, btype };
      this.setState({ activeItem });
    } else {
      const activeItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem });
    }
  };

  handlesubmit = () => {
    const item = this.state.activeItem;
    if (item.title === "" || null) {
      this.setState({ error: true });
      return;
    }
    if (!item.btype) {
      this.setState({ error0: true });
      return;
    }
    if (item.details === "" || null) {
      this.setState({ error1: true });
      return;
    }
     this.props.onSave(item);
  };

  render() {
    const { activeItem } = this.props;
    return (
      <>
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
                  id="bulletin-title"
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
              <InputLabel sx={{ padding: 2 }}>Type</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Autocomplete
                disablePortal
                options={this.state.btype}
                defaultValue={activeItem.btype}
                onChange={(event, btype) => this.handleChange(event, btype)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <FormControl error={this.state.error0} fullWidth={true}>
                    <TextField {...params} error={this.state.error0}/>
                    <FormHelperText>
                      {this.state.error0 ? "Must not empty" : " "}
                    </FormHelperText>
                  </FormControl>
                )}
                style={{ width: 200 }}
              />
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
                  id="bulletin-details"
                  name="details"
                  defaultValue={activeItem.details}
                  onChange={this.handleChange}
                  multiline
                  rows={3}
                />
                <FormHelperText id="my-helper-text">
                  {this.state.error1 ? "Must not empty" : " "}
                </FormHelperText>
              </FormControl>
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
  otherprofile: state.otherprofile,
});

const mapDispatchToProps = (dispatch) => ({
  fetchotherprofile: () => dispatch(fetchotherprofile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BulletinForm);
