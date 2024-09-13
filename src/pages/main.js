import React, { Component } from "react";
import ResponsiveDrawer from "../components/drawer";
import {Box} from "@mui/material";
import Dashboard from "./dashboard";
import ErrorPage from "./404";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <Box sx={{ width: '100%', maxWidth: "100%", height: "auto" }}>
        <ResponsiveDrawer/>
        <Dashboard/>
      </Box>
    );
  }
}

export default Main;
