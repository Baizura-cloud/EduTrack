import React, { Component } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Snack from "./snackbar";
import { emailValidation, passwordValidation } from "./utils";
import { supabase } from "../client";
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
  Grid2,
  Divider,
} from "@mui/material";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: {},
      showPassword: false,
      checked: false,
      errorName: false,
      errorEmail: false,
      errorPassword: false,
      match: true,
      onReset: false,
      toggleSnack: false,
      messageSnack: '',
      severitySnack: ''
    };
  }
  handleChange = (e) => {
    let { name, value } = e.target;
    const loginData = { ...this.state.loginData, [name]: value };
    this.setState({ loginData });
  };
  onSubmit = () => {
    if (Object.keys(this.state.loginData).length === 0){  //validate if all is empty
      this.setState({ errorName: true, errorEmail: true, errorPassword:true, toggleSnack:true, messageSnack: 'Please fill in the form to sign up', severitySnack: 'error' });
      return;
    }
    if (this.state.loginData.name !== null || "") {  // validate name
      this.setState({ errorName: false });
      if (emailValidation(this.state.loginData.email)) {  // validate email
        this.setState({ errorEmail: false });
        if (passwordValidation(this.state.loginData.password)) {  //validate password
          this.setState({ errorPassword: false });
          if (this.state.loginData.password == this.state.loginData.Cpassword) {  //validate Cpassword
            this.setState({ errorPassword: false });
            console.log("auth through backend");
            this.signupUser(this.state.loginData);
          } else {
            this.setState({ errorPassword: true, match: false, toggleSnack:true, messageSnack: 'Please confirm your password', severitySnack: 'error' });
            console.log(this.state.loginData);
          }
        } else {
          this.setState({ errorPassword: true, toggleSnack:true, messageSnack: 'Invalid password', severitySnack: 'error' });
          console.log(this.state.loginData);
        }
      } else {
        this.setState({ errorEmail: true, toggleSnack:true, messageSnack: 'Invalid email', severitySnack: 'error' });
        console.log(this.state.loginData);
      }
    } else {
      this.setState({ errorName: true, toggleSnack:true, messageSnack: 'Name is required', severitySnack: 'error' });
      console.log(this.state.loginData);
    }
  };
  
  async signupUser(loginData) {
    try {
      const { data, error } = await supabase.auth
        .signUp({
          name: loginData.name,
          email: loginData.email,
          password: loginData.password,
        })
        .then(console.log("sign in"));
      if (error) {
        console.log(error);
        this.setState({ errorEmail: true, errorPassword: true, toggleSnack:true, messageSnack: 'Email or password are invalid', severitySnack: 'error' });
      } else {
        console.log(data);
        this.setState({ errorEmail: false, errorPassword: false });
      }
    } catch (error) {
      this.setState({ errorEmail: true, errorPassword: true, toggleSnack:true, messageSnack: 'Email or password are invalid', severitySnack: 'error' });
      console.log(error);
    }
  }
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

  render() {
    const { handlechangetab } = this.props;
    return (
      <Box sx={{ width: 500, maxWidth: "100%" }}>
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
              {this.state.match? 'Password must have at least 8 characters contains one lowercase letter, uppercase letter, special character and digit. ' : 'The password does not match'}
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
              {this.state.match? 'Invalid password' : 'The password does not match'}
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl>
          <Grid2 container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid2 size={12}>
              <Button
                variant="contained"
                sx={{ width: "90%", marginTop: 2 }}
                onClick={this.onSubmit}
              >
                Sign Up
              </Button>
            </Grid2>
            <Grid2 size={12}>
              <Typography sx={{ margin: "10px" }}>
                Already have an account?{" "}
                <Link
                  underline="hover"
                  onClick={() => handlechangetab(Event, "1")}
                >
                  Sign In
                </Link>
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <Divider
                sx={{ margin: "2px", opacity: 0.5, borderColor: "black" }}
              />
            </Grid2>
            <Grid2 size={12}>
              <Button
                variant="contained"
                sx={{
                  width: "90%",
                  backgroundColor: "#e85b23",
                  "&:hover": { backgroundColor: "#a64119" },
                }}
                onClick={this.onSubmit}
              >
                <GoogleIcon sx={{ marginRight: 2 }} />
                Sign Up with Google
              </Button>
            </Grid2>
            <Grid2 size={12}>
              <Button
                variant="contained"
                sx={{
                  width: "90%",
                  backgroundColor: "#1031eb",
                  "&:hover": { backgroundColor: "#0d27bd" },
                }}
                onClick={this.onSubmit}
              >
                <FacebookIcon sx={{ marginRight: 2 }} />
                Sign Up with Facebook
              </Button>
            </Grid2>
          </Grid2>
        </FormControl>
        {this.state.toggleSnack? <Snack open={this.state.toggleSnack} message={this.state.messageSnack} severity={this.state.severitySnack} />:null}
      </Box>
    );
  }
}

export default SignUp;