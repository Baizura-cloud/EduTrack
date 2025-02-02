import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Card,
  CardActions,
  CardContent,
  Box,
  CardHeader,
  OutlinedInput,
} from "@mui/material";
import { fetchProfile, updateProfile } from "../redux/profileSlice";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid2";
import Snack from "../components/snackbar";
import CircularProgress from "@mui/material/CircularProgress";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {},
      error: false,
      error1: false,
      loading: false,
      popup: false, //snackbar open@close
      popupContent: {
        //snackbar type & message
        severity: "",
        message: "",
      },
    };
  }

  componentDidMount() {
    this.refreshData();
  }
  refreshData = () => {
    this.props.fetchProfile(this.props.auth.data.user.email);
  };
  togglesnack = () => {
    this.setState({ popup: !this.state.popup });
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.name === "firstname") {
      if (e.target.value === "") {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
    } else if (e.target.name === "lastname") {
      if (e.target.value === "") {
        this.setState({ error1: true });
      } else {
        this.setState({ error1: false });
      }
    }

    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  handleSubmit = (data) => {
    this.setState({ loading: true });
    if (data == null || Object.keys(data).length === 0) {
      this.setState({ loading: false });
      return;
    }
    const newdata = { ...data, id: this.props.profile.data[0].id };
    if (data.firstname === "") {
      this.setState({ error: true });
      this.setState({
        loading: false,
        popupContent: {
          message: "First name must not be empty",
          severity: "error",
        },
      });
      this.togglesnack();
      return;
    }
    if (data.lastname === "") {
      this.setState({ error1: true });
      this.setState({
        loading: false,
        popupContent: {
          message: "Last name must not be empty",
          severity: "error",
        },
      });
      this.togglesnack();
      return;
    }
    this.props.updateProfile(newdata).then(() => {
      this.setState({
        loading: false,
        popupContent: {
          message: "Profile updated successfully",
          severity: "success",
        },
      });
      this.togglesnack();
    });
  };

  render() {
    const { data, loading } = this.props.profile;
    return (
      <Box sx={{ minWidth: 275, flexGrow: 1 }}>
        {loading ? (
          <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh", // Adjust height as needed
          }}
        >
          <CircularProgress  />
        </Box>
        ) : (
          <Card variant="outlined" sx={{ padding: 2 }}>
            <CardHeader
              title="Account Setting"
              sx={{ textAlign: "start", margin: 2 }}
            />
            <CardContent sx={{ textAlign: "start" }}>
              <Grid container spacing={2} sx={{ margin: 2 }}>
                <Grid size={{ xs: 12, md: 1 }}>
                  <InputLabel sx={{ padding: 1 }}>First Name</InputLabel>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <FormControl error={this.state.error}>
                    <OutlinedInput
                      type="text"
                      id="first-name"
                      sx={{ width: 250 }}
                      name="firstname"
                      defaultValue={data[0] && data[0].firstname}
                      onChange={this.handleChange}
                    />
                    <FormHelperText id="my-helper-text">
                      {this.state.error ? "Must not empty" : " "}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 1 }}>
                  <InputLabel sx={{ padding: 1 }}>Last Name</InputLabel>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <FormControl error={this.state.error1}>
                    <OutlinedInput
                      type="text"
                      id="last-name"
                      sx={{ width: 250 }}
                      name="lastname"
                      defaultValue={data[0] && data[0].lastname}
                      onChange={this.handleChange}
                    />
                    <FormHelperText id="my-helper-text">
                      {this.state.error1 ? "Must not empty" : " "}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ margin: 2 }}>
                <Grid size={{ xs: 12, md: 1 }}>
                  <InputLabel sx={{ padding: 1 }}>Address</InputLabel>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl>
                    <OutlinedInput
                      fullWidth={true}
                      sx={{ width: { xs: 250, md: 645 } }}
                      type="text"
                      id="address"
                      name="address"
                      defaultValue={data[0] && data[0].address}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ margin: 2 }}>
                <Grid size={{ xs: 12, md: 1 }}>
                  <InputLabel sx={{ paddingTop: 2 }}>Phone Number</InputLabel>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl>
                    <OutlinedInput
                      sx={{ width: 250 }}
                      type="text"
                      id="phone-number"
                      name="phone"
                      defaultValue={data[0] && data[0].phone}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ margin: 2 }}>
                <Grid size={{ xs: 12, md: 1 }}>
                  <InputLabel sx={{ paddingTop: 2 }}>Email</InputLabel>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl>
                    <OutlinedInput
                      sx={{ width: 250 }}
                      type="text"
                      id="email"
                      name="email"
                      defaultValue={data[0] && data[0].email}
                      disabled
                    />
                    <FormHelperText id="my-helper-text">
                      Contact admin to change your email
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ margin: 2 }}>
                <Grid size={{ xs: 12, md: 1 }}>
                  <InputLabel sx={{ paddingTop: 2 }}>Role</InputLabel>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl>
                    <OutlinedInput
                      type="text"
                      sx={{ width: 250 }}
                      id="role"
                      name="role"
                      defaultValue={data[0] && data[0].role}
                      disabled
                    />
                    <FormHelperText id="my-helper-text">
                      Contact super admin to change your role
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                sx={{ margin: 2 }}
                variant="contained"
                color="success"
                onClick={() => this.handleSubmit(this.state.activeItem)}
                startIcon={
                  this.state.loading ? <CircularProgress size="20px" /> : null
                }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        )}

        {this.state.popup ? (
          <Snack
            togglesnack={this.togglesnack}
            open={this.state.popup}
            message={this.state.popupContent.message}
            severity={this.state.popupContent.severity}
          />
        ) : null}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (email) => dispatch(fetchProfile(email)),
  updateProfile: (data) => dispatch(updateProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
