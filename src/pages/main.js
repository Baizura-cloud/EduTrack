import React, { Component } from "react";
import ResponsiveDrawer from "../components/drawer";
import { Card, CardContent, Box, Button } from "@mui/material";
import { supabase } from "../client";
import Dashboard from "./dashboard";

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
