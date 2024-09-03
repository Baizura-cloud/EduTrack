import * as React from "react";
import Signup from "../components/signup";
import SignIn from "../components/signin";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Typography } from "@mui/material";

export default function Auth() {
  const [value, setValue] = React.useState("1");
  const [show, setShow] = React.useState(true)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue == 2){
      setShow(false)
    }
    if(newValue == 1){
      setShow(true)
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              {show? <Typography> Sign In </Typography> : <Typography> Sign Up </Typography>}
              <TabList
                onChange={handleChange}
                centered={true}
                indicatorColor="secondary"
              >
                <Tab label="Sign In" value="1" />
                <Tab label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><SignIn/></TabPanel>
            <TabPanel value="2"><Signup/></TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
}
