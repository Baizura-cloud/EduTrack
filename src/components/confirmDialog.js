import React, { Component } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";

export default class AlertDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { handleDelete, deleteItem, alertContent } = this.props;
    return (
      <React.Fragment>
        <Dialog open={true} onClose={handleDelete}>
          <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
            <Box pb={3}>
              <WarningIcon color="error" fontSize="large" />
            </Box>
            {"Are you sure to delete?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alertContent.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleDelete}>Cancel</Button>
            <Button variant="outlined" onClick={deleteItem} color="error">
              Delete {alertContent.button}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
