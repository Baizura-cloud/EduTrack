import React, { Component } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

class Signup extends Component {
  render() {
    return (
      <div>
        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TextField fullWidth label="fullWidth" id="fullWidth" />
        </Box>
      </div>
    );
  }
}

export default Signup;
