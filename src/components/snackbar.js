import React, { Component } from "react";
import { Alert, Snackbar } from "@mui/material";

class Snack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { togglesnack, open, message, severity } = this.props;
    return (
      <div>
        <Snackbar open={open} autoHideDuration={3000} onClose={togglesnack}>
          <Alert
            onClose={togglesnack}
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
export default Snack;
