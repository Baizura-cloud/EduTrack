import React, { Component } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { emailValidation } from "./utils";
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
      error0: false,
      error: false,
      error1: false,
      onReset: false,
    };
  }
  handleChange = (e) => {
    let { name, value } = e.target;
    const loginData = { ...this.state.loginData, [name]: value };
    this.setState({ loginData });
  };
  onSubmit = () => {
    if (emailValidation(this.state.loginData.email)) {
      this.setState({ error: false });
      console.log("auth through backend");
    } else {
      this.setState({ error: true });
      console.log(this.state.loginData);
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

  render() {
    const {handlechangetab} = this.props;
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
            error={this.state.error0}
          />
          {this.state.error ? (
            <FormHelperText sx={{ color: "red" }}>Name is required</FormHelperText>
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
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="Cpassword">Confirm Password</InputLabel>
          <OutlinedInput
            fullWidth
            id="Cpassword"
            name="Cpassword"
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
            label="Confirm Password"
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
          <Grid2 container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid2 size={12}>
              <Button
                variant="contained"
                sx={{ width: "90%", marginTop:2 }}
                onClick={this.onSubmit}
              >
                Sign Up
              </Button>
            </Grid2>
            <Grid2 size={12}>
              <Typography sx={{ margin: "10px" }}>
                Already have an account? <Link underline="hover" onClick={() => handlechangetab(Event, '1')}>Sign In</Link>
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
      </Box>
    );
  }
}

export default SignUp;
