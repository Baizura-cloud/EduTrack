import React, { Component } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Snack from "./snackbar";
import { emailValidation, passwordValidation } from "./utils";
import {
  Link,
  Box,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  Typography,
  Grid,
  Divider,
} from "@mui/material";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupData: {},
      showPassword: false,
      checked: false,
      errorName: false,
      errorEmail: false,
      errorPassword: false,
      match: true,
      onReset: false,
      toggleSnack: false,
      messageSnack: "",
      severitySnack: "",
    };
  }
  handleChange = (e) => {
    let { name, value } = e.target;
    const signupData = { ...this.state.signupData, [name]: value };
    this.setState({ signupData });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      errorName: false,
      errorEmail: false,
      errorPassword: false,
    });

    if (Object.keys(this.state.signupData).length === 0) {
      //validate if all is empty
      this.setState({
        errorName: true,
        errorEmail: true,
        errorPassword: true,
        toggleSnack: true,
        messageSnack: "Please fill in the form to sign up",
        severitySnack: "error",
      });
      return;
    }
    if (this.state.signupData.name == null || "") {
      //validate name
      this.setState({
        errorName: true,
        toggleSnack: true,
        messageSnack: "Name is required",
        severitySnack: "error",
      });
      return;
    } else {
      this.setState({ errorName: false });
    }
    if (!emailValidation(this.state.signupData.email)) {
      //validate email
      this.setState({
        errorEmail: true,
        toggleSnack: true,
        messageSnack: "Invalid email",
        severitySnack: "error",
      });
      return;
    } else {
      this.setState({ errorEmail: false });
    }
    if (!passwordValidation(this.state.signupData.password)) {
      //validate password
      this.setState({
        errorPassword: true,
        toggleSnack: true,
        messageSnack: "Invalid password",
        severitySnack: "error",
      });
      return;
    } else {
      this.setState({ errorPassword: false });
    }
    if (this.state.signupData.password !== this.state.signupData.Cpassword) {
      //validate Cpassword
      this.setState({
        errorPassword: true,
        match: false,
        toggleSnack: true,
        messageSnack: "Invalid password",
        severitySnack: "error",
      });
      return;
    } else {
      this.setState({ errorPassword: false });
    }
    if (
      (this.state.errorName == false && this.state.errorEmail) == false &&
      this.state.errorPassword == false
    ) {
      this.props.handlesignupuser(this.state.signupData);
    }
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  handleReset = () => {
    this.setState({ onReset: !this.state.onReset });
  };
  togglesnack = () => {
    this.setState({ toggleSnack: !this.state.toggleSnack });
  };

  render() {
    const { handlechangetab } = this.props;
    return (
      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <form onSubmit={this.onSubmit}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="email">Name</InputLabel>
            <OutlinedInput
              fullWidth
              id="name"
              label="Name"
              name="name"
              type="text"
              onChange={this.handleChange}
              required
              error={this.state.errorName}
            />
            {this.state.errorName ? (
              <FormHelperText sx={{ color: "red" }}>
                Name is required
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="text"
              onChange={this.handleChange}
              required
              error={this.state.errorEmail}
            />
            {this.state.errorEmail ? (
              <FormHelperText sx={{ color: "red" }}>
                Invalid Email
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              name="password"
              type={this.state.showPassword ? "text" : "password"}
              onChange={this.handleChange}
              error={this.state.errorPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                    onMouseUp={this.handleMouseUpPassword}
                    edge="end"
                  >
                    {this.state.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              required
              label="Password"
            />
            {this.state.errorPassword ? (
              <FormHelperText sx={{ color: "red" }}>
                {this.state.match
                  ? "Password must have at least 8 characters contains one lowercase letter, uppercase letter, special character and digit. "
                  : "The password does not match"}
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="Cpassword">Confirm Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="Cpassword"
              name="Cpassword"
              type={this.state.showPassword ? "text" : "password"}
              onChange={this.handleChange}
              error={this.state.errorPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                    onMouseUp={this.handleMouseUpPassword}
                    edge="end"
                  >
                    {this.state.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              required
              label="Confirm Password"
            />
            {this.state.errorPassword ? (
              <FormHelperText sx={{ color: "red" }}>
                {this.state.match
                  ? "Invalid password"
                  : "The password does not match"}
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid size={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "90%", marginTop: 2 }}
                  onClick={this.onSubmit}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid size={12}>
                <Typography sx={{ margin: "10px" }}>
                  Already have an account?{" "}
                  <Link
                    underline="hover"
                    onClick={() => handlechangetab(Event, "1")}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Grid>
              
            </Grid>
          </FormControl>
          {this.state.toggleSnack ? (
            <Snack
              togglesnack={this.togglesnack}
              open={this.state.toggleSnack}
              message={this.state.messageSnack}
              severity={this.state.severitySnack}
            />
          ) : null}
        </form>
      </Box>
    );
  }
}

export default SignUp;
