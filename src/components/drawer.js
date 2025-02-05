import React, { Component } from "react";
import {
  AppBar,
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
  Paper,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from '@mui/icons-material/EventNote';
import SubjectIcon from '@mui/icons-material/Subject';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircle from "@mui/icons-material/AccountCircle";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../logo2.png";
import "../App.css";
import { connect } from "react-redux";
import { fetchProfile } from "../redux/profileSlice";
import { logoutUser } from "../redux/authSlice";
import { Link, Outlet, Navigate } from "react-router-dom";
import { persistor } from "../redux/store";
import Loading from "./loading";
class DrawerAppbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      isClosing: false,
      auth: true,
      anchorEl: null,
      drawerWidth: 240,
      loading: false,
      path: "",
      direct: false,
    };
  }
  componentDidMount() {
    this.setState({ path: window.location.pathname });
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
  handleClick = () => {
    this.setState({ path: window.location.pathname });
  };
  handleLogout = () => {
    this.setState({ loading: true });
    this.props.logoutUser().then(()=>{
      persistor.purge()
      localStorage.removeItem('persist:root')
    })
    this.setState({ direct: true });
  };

  drawer = () => {
    const icon = [
      <DashboardIcon />,
      <RecentActorsIcon />,
      <SubjectIcon />,
      <EventNoteIcon />,
      <ManageAccountsIcon />,
    ];
    const path = ["/dashboard", "/classroom", "/courses", "/exam", "/account"];
    return (
      <div>
        <Toolbar>
          <img alt="logo" src={logo} />
        </Toolbar>
        <Divider sx={{ borderWidth: 2 }} />
        <List>
          {["Dashboard", "Classroom", "Courses Hub", "Examination", "Account"].map(
            (text, index) => (
              <ListItem key={index} sx={{}}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRight:
                      this.state.path === path[index]
                        ? "2px solid blue"
                        : "inherit",
                  }}
                  onClick={this.handleClick}
                >
                  <Link
                    to={path[index]}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemIcon
                        sx={{
                          color:
                            this.state.path === path[index]
                              ? "#11469c"
                              : "inherit",
                        }}
                      >
                        {icon[index]}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          color:
                            this.state.path === path[index]
                              ? "#11469c"
                              : "inherit",
                        }}
                        primary={text}
                      />
                    </ListItemButton>
                  </Link>
                </Paper>
              </ListItem>
            )
          )}
        </List>
      </div>
    );
  };

  render() {
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${this.state.drawerWidth}px)` },
            ml: { sm: `${this.state.drawerWidth}px` },
            backgroundColor: "#ffffff",
            boxShadow: "none",
          }}
        >
          <Toolbar>
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
              fontSize="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              sx={{
                position: "absolute",
                top: 10,
                right: 20,
              }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              onClick={this.handleClose}
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
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              <Link
                to="/account"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>My account</MenuItem>
              </Link>
            </Menu>
            {/* </Stack> */}
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
          
          {this.state.loading ? <Loading /> : null}
          {this.state.direct? <Navigate to='/' replace={true}/> : <Outlet />}
          {/* page content */}
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
  fetchProfile: (email) => dispatch(fetchProfile(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerAppbar);
