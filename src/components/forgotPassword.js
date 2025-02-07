import React, { Component } from "react";
import { emailValidation } from "./utils";
import { supabase } from "../client";
import Snack from "./snackbar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  DialogTitle,
  Button,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import { resetPasswordEmail } from "../redux/authSlice";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      error: false,
      toggleSnack: false,
      messageSnack: '',
      severitySnack: ''
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const data = { ...this.state.data, [name]: value };
    this.setState({ data });
  };
  onSend = (e) => {
    if (this.state.data !== null || {}) {
      this.setState({ error: false });
      if (emailValidation(this.state.data.email)) {
        this.setState({ error: false });
        console.log(this.state.data.email)
        this.props.resetPasswordEmail(this.state.data.email)
        .then((res) =>{
          this.setState({ toggleSnack: true, messageSnack: 'Email Sent', severitySnack: 'success' });
          this.props.toggle()
        })
        
      } else {
        this.setState({ error: true, toggleSnack: true, messageSnack: 'Invalid Email', severitySnack: 'error' });
      }
    }
  };

  render() {
    const { toggle } = this.props;

    return (
      <div>
        <Dialog fullWidth={true} maxWidth={"sm"} open={true} onClose={toggle}>
          <DialogTitle sx={{ margin: "10px" }}>
            <Typography>
              Enter your email and we'll send you a link to reset your password
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ paddingTop: 2 }}>
            <FormControl error={this.state.error} fullWidth={true}>
             
              <OutlinedInput
                fullWidth
                id="email"
                name="email"
                type="text"
                onChange={this.handleChange}
                required
                error={this.state.error}
              />
              {this.state.error ? (
                <FormHelperText sx={{ color: "red" }}>
                  Invalid Email
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={this.onSend}
              sx={{ margin: "10px" }}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          {this.state.toggleSnack? <Snack open={this.state.toggleSnack} message={this.state.messageSnack} severity={this.state.severitySnack} />:null}
        </div>
      </div>
    );
  }
}
// const mapStateToProps = (state) => ({
// });
const mapDispatchToProps = (dispatch) => ({
  resetPasswordEmail: (email) => dispatch(resetPasswordEmail(email))
})
export default connect(null,mapDispatchToProps)(ForgotPassword);
//export default ForgotPassword