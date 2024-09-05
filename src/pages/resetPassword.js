import React, { Component } from "react";
import "../App.css";
import { passwordValidation } from "../components/utils";
import { supabase } from "../client";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  IconButton,
  Grid2,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from "../logo.png";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:{},
        error:false,
        error1:false,
        match:true
    };
  }
  onSubmit = () => {
    if(this.state.data.password == null || ''){
        this.setState({error:true})
    }else if(this.state.data.Cpassword == null || ''){
        this.setState({error1:true})
    }else if(this.state.data.Cpassword !== this.state.data.password){
        this.setState({error:true})
        this.setState({error1:true})
        this.setState({match:false})
    }
    else{
        console.log('send through backend')
        console.log(this.state.data)
    }
  };
  handleChange = (e) => {
    let { name, value } = e.target;
    const data = { ...this.state.data, [name]: value };
    this.setState({ data });
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
      <Card elevation={3} sx={{ minWidth: 275, borderRadius: "10px" }}>
        <CardContent>
          <Box sx={{ width: 500, maxWidth: "100%", height: "auto" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Stack
                sx={{ justifyContent: "center", alignItems: "center" }}
                spacing={0}
              >
                <img className="logo" alt="logo" loading="lazy" src={logo} />
                <Typography>Reset account password</Typography>
              </Stack>
            </Box>
            <Typography sx={{padding:2}}>Enter a new password for your account</Typography>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="password"
                name="password"
                type={this.state.showPassword ? "text" : "password"}
                onChange={this.handleChange}
                error={this.state.error}
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
              {this.state.error ? (
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
                error={this.state.error}
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
              {this.state.error ? (
                <FormHelperText sx={{ color: "red" }}>
                {this.state.match? 'Invalid Password': 'The password does not match'}
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
                sx={{ width: "100%", marginTop:2, padding:2 }}
                onClick={this.onSubmit}
              >
                Reset Password
              </Button>
            </Grid2>
          </Grid2>
        </FormControl>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default ResetPassword;
