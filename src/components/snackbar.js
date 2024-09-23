import React, { Component } from "react";
import { Alert, Snackbar } from "@mui/material";

class Snack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      message: this.props.message,
      severity: this.props.severity
    };
  }

  render() {
    const {togglesnack} = this.props
    return (
      <div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          onClose={togglesnack}
        >
          <Alert
            onClose={togglesnack}
            severity={this.state.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {this.state.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
export default Snack;
