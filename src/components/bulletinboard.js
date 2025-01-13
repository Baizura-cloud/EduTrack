import * as React from "react";
import AlertDialog from "./confirmDialog";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from "@mui/icons-material/Person";
import DialogForm from "./dialogform";
import CampaignIcon from "@mui/icons-material/Campaign";
import {
  createBulletin,
  deleteBulletin,
  fetchBulletin,
  updateBulletin,
} from "../redux/bulletinSlice";
import { connect } from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Paper, Stack, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Snack from "./snackbar";

class Bulletin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {},
      postList: [],
      toggleDrawer: false,
      confirmDel: false, //confirm delete dialog open@close
      popup: false, //snackbar open@close
      popupContent: {
        //snackbar type & message
        severity: "",
        message: "",
      },
      alertContent: {
        // on confirm delete data
        message:
          "This action cannot be undone. All data related to this post will be deleted",
        button: "Bulletin",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    this.props.fetchBulletin();
  };
  createpost = () => {
    const item = { title: "", details: "" };
    this.setState({ activeItem: item, toggleDrawer: !this.state.toggleDrawer }); //open drawer
  };
  toggle = () => {
    this.setState({ toggleDrawer: !this.state.toggleDrawer }); //function to be use to close drawer
  };
  editpost = (item) => {
    this.setState({
      activeItem: item,
      toggleDrawer: !this.state.toggleDrawer,
    }); //open drawer
  };
  handleSubmitItem = (item) => {
    this.toggle();
    if (item.id) {
      this.props.updateBulletin(item).then(() => {
        this.refreshList();
        this.togglesnack("edit");
      });
    } else {
      const newItem = { ...item, created_by: this.props.auth.data.user.email };
      this.props.createBulletin([newItem]).then(() => {
        this.refreshList();
        this.togglesnack("submit");
      });
    }
  };
  handleDelete = (item) => {
    //open modal confirm delete
    this.setState({ activeItem: item, confirmDel: !this.state.confirmDel });
  };
  handleDeleteItem = (item) => {
    this.handleDelete(); // close the alert
    item = this.state.activeItem;
    try {
      this.props.deleteBulletin(item.id).then(() => {
        this.refreshList();
        this.togglesnack("delete");
      });
    } catch (error) {
      this.togglesnack("error");
      console.log(error);
    }
  };

  togglesnack = (snacktype) => {
    this.setState({ popup: !this.state.popup });
    if (snacktype == "delete") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Post deleted successfully",
        },
      });
    } else if (snacktype == "submit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Post submitted successfully",
        },
      });
    } else if (snacktype == "edit") {
      this.setState({
        popupContent: {
          severity: "success",
          message: "Post edited successfully",
        },
      });
    } else if (snacktype == "error") {
      this.setState({
        popupContent: {
          severity: "error",
          message: "Error: please make sure the data are valid",
        },
      });
    }
  };

  renderTooltip = (post) => {
    return (
      <Stack alignItems={"start"} direction="row" sx={{ marginTop: 2 }}>
        {post.created_by == this.props.auth.data.user.email ? (
          <div>
            <Tooltip title={"edit"} arrow>
              <IconButton
                sx={{ padding: 0 }}
                color="secondary"
                onClick={() => this.editpost(post)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={"delete"} arrow>
              <IconButton
                sx={{ padding: 0 }}
                color="error"
                onClick={() => this.handleDelete(post)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        ) : null}
        <Tooltip title={"Author: " + post.created_by} arrow>
          <PersonIcon color="primary" sx={{ margin: 0 }} />
        </Tooltip>
      </Stack>
    );
  };

  renderCard = () => {
    const { bulletin } = this.props;
    return (
      <Paper elevation={0}>
        {bulletin
          ? bulletin.data.map((post) => (
              <li key={post.id}>
                <Paper elevation={2} sx={{ marginTop: 1, padding: 2 }}>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Stack direction={"row"} spacing={2}>
                        <Typography sx={{ textAlign: "justify", fontSize: 14 }}>
                          {post.title}
                        </Typography>
                        <Tooltip title={"Announcement"}>
                          <CampaignIcon fontSize="small" sx={{ margin: 0 }} />
                        </Tooltip>
                      </Stack>
                      {this.renderTooltip(post)}
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Typography sx={{ textAlign: "justify", fontSize: 12 }}>
                      {post.details}
                    </Typography>
                  </Grid>
                </Paper>
              </li>
            ))
          : null}
      </Paper>
    );
  };

  render() {
    return (
      <>
        {this.state.toggleDrawer ? (
          <DialogForm
            toggle={this.toggle}
            activeItem={this.state.activeItem}
            onSave={this.handleSubmitItem}
            flag="bulletin"
          />
        ) : null}
        <Card variant="outlined">
          <CardHeader
            title="Bulletin Board"
            subheader="Your daily announcements & events"
            action={
              <div align="right">
                <IconButton
                color="primary"
                onClick={this.createpost}
                >
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </div>
            }
          />
          <CardContent>
            <ul>{this.renderCard()}</ul>
          </CardContent>
        </Card>
        {this.state.confirmDel ? (
          <AlertDialog
            activeItem={this.state.activeItem}
            handleDelete={this.handleDelete}
            deleteItem={this.handleDeleteItem}
            alertContent={this.state.alertContent}
          />
        ) : null}
        {this.state.popup ? (
          <Snack
            togglesnack={this.togglesnack} // the function
            open={this.state.popup}
            message={this.state.popupContent.message}
            severity={this.state.popupContent.severity}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  bulletin: state.bulletin,
});
const mapDispatchToProps = (dispatch) => ({
  fetchBulletin: () => dispatch(fetchBulletin()),
  deleteBulletin: (id) => dispatch(deleteBulletin(id)),
  updateBulletin: (data) => dispatch(updateBulletin(data)),
  createBulletin: (data) => dispatch(createBulletin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bulletin);
