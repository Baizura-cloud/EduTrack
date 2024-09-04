import * as React from "react";
import "../App.css";
import Signup from "../components/signup";
import SignIn from "../components/signin";
import {Card, CardContent, Tab, Box, Typography, Stack} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import logo from "../logo.png";

export default function Auth() {
  const [value, setValue] = React.useState("1");
  const [show, setShow] = React.useState(true);

  const handlechangetab = (event, newValue) => {
    setValue(newValue);
    if (newValue == 2) {
      setShow(false);
    }
    if (newValue == 1) {
      setShow(true);
    }
  };

  return (
    <Card elevation={3} sx={{ minWidth: 275, borderRadius: "10px" }}>
      <CardContent>
        <Box sx={{ width: 500, maxWidth: "100%", height: 'auto' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack sx={{justifyContent: "center", alignItems: "center"}} spacing={0}>
                  <img className="logo" alt="logo" loading="lazy" src={logo} />
                  <Typography>
                    {show? 'Welcome back, enter your credential to sign in' : 'Create your account to join us'}
                  </Typography>
                </Stack>
              <TabList
                onChange={handlechangetab}
                centered={true}
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab label="Sign In" value="1" />
                <Tab label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <SignIn handlechangetab={handlechangetab} />
            </TabPanel>
            <TabPanel  value="2">
              <Signup handlechangetab={handlechangetab} />
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
}
