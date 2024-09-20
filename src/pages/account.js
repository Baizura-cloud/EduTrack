import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import { Card, CardActions, CardContent, Box } from "@mui/material";
import {fetchProfile} from "../redux/profileSlice"
import { connect } from "react-redux";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      error: false,
      error1: false,
    };
  }

  componentDidMount() {
    this.props.fetchProfile("baizura1996@gmail.com")
    this.setState({})
  }

  handleChange = (e) => {
    let { name, value } = e.target;
   
    // if (e.target.name == "title") {
    //   if (e.target.value == "") {
    //     this.setState({ error: true });
    //   } else {
    //     this.setState({ error: false });
    //   }
    // } else if (e.target.name == "description") {
    //   if (e.target.value == "") {
    //     this.setState({ error1: true });
    //   } else {
    //     this.setState({ error: false });
    //   }
    // }

    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  handleSubmit = (data) => {
    console.log(data)
  }

  render() {
    const { profile} = this.props;
    return (
      <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" >
        Settings
        <CardContent sx={{textAlign:'start'}}>
          <InputLabel>First Name</InputLabel>
          <FormControl error={this.state.error} >
            <Input
              type="text"
              id="first-name"
              name="firstname"
              value={profile.data[0].firstname}
              onChange={this.handleChange}
            />
            <FormHelperText id="my-helper-text">
              {this.state.error ? "Must not empty" : " "}
            </FormHelperText>
          </FormControl>

          <InputLabel sx={{ paddingTop: 2 }}>Last Name</InputLabel>
          <FormControl error={this.state.error1} >
            <Input
              type="text"
              id="last-name"
              name="lastname"
              value={profile.data[0].lastname}
              onChange={this.handleChange}
            />
            <FormHelperText id="my-helper-text">
              {this.state.error1 ? "Must not empty" : " "}
            </FormHelperText>
          </FormControl>

          <InputLabel sx={{ paddingTop: 2 }}>Address</InputLabel>
          <FormControl error={this.state.error1} >
            <Input
              type="text"
              id="address"
              name="address"
              value={profile.data[0].address}
              onChange={this.handleChange}
            />
            <FormHelperText id="my-helper-text">
              {this.state.error1 ? "Must not empty" : " "}
            </FormHelperText>
          </FormControl>

          <InputLabel sx={{ paddingTop: 2 }}>Phone Number</InputLabel>
          <FormControl error={this.state.error1} >
            <Input
              type="text"
              id="phone-number"
              name="phone"
              value={profile.data[0].phone}
              onChange={this.handleChange}
            />
            <FormHelperText id="my-helper-text">
              {this.state.error1 ? "Must not empty" : " "}
            </FormHelperText>
          </FormControl>

          <InputLabel sx={{ paddingTop: 2 }}>Email</InputLabel>
          <FormControl>
            <Input
              type="text"
              id="email"
              name="email"
              value={profile.data[0].email}
              disabled
            />
            <FormHelperText id="my-helper-text">
              Contact admin to change your email
            </FormHelperText>
          </FormControl>

          <InputLabel sx={{ paddingTop: 2 }}>Role</InputLabel>
          <FormControl  >
            <Input
              type="text"
              id="role"
              name="role"
              value={profile.data[0].role}
              disabled
            />
            <FormHelperText id="my-helper-text">
              Contact super admin to change your role
            </FormHelperText>
          </FormControl>

        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="success"
            onClick={() => this.handleSubmit(this.state.activeItem)}
          >
            Save
          </Button>
        </CardActions>
      </Card>
      </Box>
    );
  }
}

const mapStateToProps = (state) =>({
  profile: state.profile
})
const mapDispatchToProps = (dispatch) =>({
  fetchProfile: (email) => dispatch(fetchProfile(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)