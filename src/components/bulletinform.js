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
import { fetchotherprofile } from "../redux/otherprofileSlice";
import { connect } from "react-redux";

class BulletinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: false,
      error1: false,
      tagProfile: [],
    };
  }
  componentDidMount() {
    this.handleAutocomplete();
  }
  handleAutocomplete = () => {
    this.props.fetchotherprofile();
    this.setState({ tagProfile: this.props.otherprofile.data });
  };
  handleChange = (e, tag) => {
    let { name, value } = e.target;
    
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
    if(tag){
      const activeItem = { ...this.state.activeItem, tag };
      this.setState({ activeItem });
    }else{
      const activeItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem });
    }
    
  };

  handlesubmit = () => {
    const item = this.state.activeItem;
    if (item.title == "" || null) {
      this.setState({ error: true });
      return;
    }
    if (item.description == "" || null) {
      this.setState({ error1: true });
      return;
    }
     this.props.onSave(item);
  };

  render() {
    const { activeItem } = this.props;

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
                />
                <FormHelperText id="my-helper-text">
                  {this.state.error1 ? "Must not empty" : " "}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 3 }}>
              <InputLabel sx={{ padding: 2 }}>Tag others</InputLabel>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Autocomplete
                multiple
                id="tag-profile"
                name="tagprofile"
                onChange={(event, tag)=>this.handleChange(event,tag)}
                options={this.state.tagProfile}
                disableCloseOnSelect
                getOptionLabel={(option) =>
                  option.firstname + " " + option.lastname
                }
                defaultValue={activeItem.tag !==null? activeItem.tag : undefined}
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
                      {option.firstname} {option.lastname}
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
            variant="outlined"
            color="success"
            onClick={this.handlesubmit}
          >
            Save
          </Button>
        </CardActions>
      </Card>
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
