// import React, { Component } from "react";
// import {AppBar, Box, Toolbar, Typography, Button, IconButton, Container} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { supabase } from "../client";
// class Navbar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   async signoutUser() {
//     try {
//       const { error } = await supabase.auth
//         .signOut()
//         .then(console.log("signout"));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   render() {
//     return (
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static">
//           <Toolbar disableGutters>
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               sx={{ mr:2 , ml: 10 }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Button onClick={this.signoutUser} color="inherit">
//               Logout
//             </Button>
//           </Toolbar>
//         </AppBar>
//       </Box>
//     );
//   }
// }
// export default Navbar;
