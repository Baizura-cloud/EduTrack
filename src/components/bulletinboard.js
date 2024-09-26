import * as React from "react";
import AlertDialog from "./confirmDialog";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import FormDrawer from "./formdrawer";
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
import { Stack, Tooltip } from "@mui/material";
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

  renderCard = () => {
    const { bulletin } = this.props;
    return (
      <Card>
        {bulletin
          ? bulletin.data.map((post) => (
              <CardContent key={post.id}>
                {post.created_by == this.props.auth.data.user.email ? (
                  <CardHeader
                    action={
                      <Stack direction="row">
                        <Tooltip title={"edit"} arrow>
                          <IconButton
                            color="secondary"
                            onClick={() => this.editpost(post)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"delete"} arrow>
                          <IconButton
                            color="error"
                            onClick={() => this.handleDelete(post)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    }
                  />
                ) : null}
                <Typography
                  gutterBottom
                  sx={{ textAlign: "start", fontSize: 16 }}
                >
                  {post.title}
                </Typography>
                <Typography sx={{ textAlign: "justify", fontSize: 14 }}>
                  {post.details}
                  <br />
                </Typography>
                <Stack alignItems={'start'}>
                  <Tooltip title={"created by " + post.created_by} arrow>
                      <ContactPageIcon color="secondary" />
                  </Tooltip>
                </Stack>
              </CardContent>
            ))
          : null}
      </Card>
    );
  };

  render() {
    return (
      <Box sx={{ minWidth: 275 }}>
        {this.state.toggleDrawer ? (
          <FormDrawer
            toggle={this.toggle}
            activeItem={this.state.activeItem}
            onSave={this.handleSubmitItem}
            flag="bulletin"
          />
        ) : null}
        <Card variant="outlined">
          <CardHeader
            title="Bulletin Board"
            subheader="Your daily announcement"
            action={
              <div align="right">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={this.createpost}
                >
                  New post
                </Button>
              </div>
            }
          />
          <CardContent>{this.renderCard()}</CardContent>
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
      </Box>
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
