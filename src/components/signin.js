import React, { Component } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Link,
  Box,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  FormControlLabel,
  IconButton,
  Checkbox,
  Typography,
} from "@mui/material";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: {},
      showPassword: false,
      checked: false,
      error: false,
      error1: false,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const loginData = { ...this.state.loginData, [name]: value };
    this.setState({ loginData });
  };
  onSubmit = () => {
    if (this.emailValidation()) {
      console.log("auth through backend");
    }
    console.log(this.state.loginData);
  };
  emailValidation = () => {
    let email = this.state.loginData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === null || "") {
      this.setState({ error: true });
      return false;
    }
    if (!emailRegex.test(email)) {
      this.setState({ error: true });
      return false;
    } else {
      this.setState({ error: false });
      return true;
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

  render() {
    return (
      <Box sx={{ width: 500, maxWidth: "100%" }}>
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
            error={this.state.error}
          />
          {this.state.error ? (
            <FormHelperText sx={{ color: "red" }}>Invalid Email</FormHelperText>
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
            error={this.state.error1}
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
          {this.state.error1 ? (
            <FormHelperText sx={{ color: "red" }}>
              Invalid Password
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleChange}
              />
            }
            label="Remember me"
          />
        </FormControl>
        <FormControl>
          <Typography>
            <Link underline="hover">Forgot Password?</Link>
          </Typography>
        </FormControl>
        <FormControl>
          <Button variant="outlined" onClick={this.onSubmit}>
            Log In
          </Button>
        </FormControl>
      </Box>
    );
  }
}

export default SignIn;
