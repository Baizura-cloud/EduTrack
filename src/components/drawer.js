import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  MenuItem,
  Menu,
  Stack,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../logo.png";
import "../App.css";
import Snack from "./snackbar";
import { connect } from "react-redux";
import { logoutUser } from "../redux/authSlice2";

class DrawerAppbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      isClosing: false,
      auth: true,
      anchorEl: null,
      drawerWidth: 240,
      toggleSnack: false,
      messageSnack: '',
      severitySnack: ''
    };
  }


  handleDrawerClose = () => {
    this.setState({ isClosing: true, mobileOpen: false });
  };

  handleDrawerTransitionEnd = () => {
    this.setState({ isClosing: false });
  };

  handleDrawerToggle = () => {
    if (!this.state.isClosing) {
      this.setState({ mobileOpen: !this.state.mobileOpen });
    }
  };
  handleChange = (event) => {
    this.setState({ auth: event.currentTarget });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  drawer = () => {
    return (
      <div>
        <Toolbar>
          <img alt="logo" src={logo} />
        </Toolbar>
        <Divider />
        <List>
          {["Home", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );
  };

  render() {
    const {auth, logoutUser} = this.props
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${this.state.drawerWidth}px)` },
            ml: { sm: `${this.state.drawerWidth}px` },
            backgroundColor: "#ffff",
            boxShadow: "none",
            // display: { xs: 'block', sm: 'none' },
          }}
        >
          <Toolbar>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row-reverse"
              justifyContent={"space-between"}
            >
              <IconButton
                color="black"
                aria-label="open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="black"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: this.state.drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={this.state.mobileOpen}
            onTransitionEnd={this.handleDrawerTransitionEnd}
            onClose={this.handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: this.state.drawerWidth,
              },
            }}
          >
            {this.drawer()}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: this.state.drawerWidth,
              },
            }}
            open
          >
            {this.drawer()}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${this.state.drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {/* page content */}
        </Box>
        {this.state.toggleSnack? <Snack open={this.state.toggleSnack} message={this.state.messageSnack} severity={this.state.severitySnack} />:null}
      </Box>
    );
  }
}

const mapStateToProps = (state) =>({
  auth: state.auth
})
const mapDispatchToProps = (dispatch) =>({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerAppbar);
