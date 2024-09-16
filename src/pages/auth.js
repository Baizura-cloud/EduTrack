import * as React from "react";
import "../App.css";
import Signup from "../components/signup";
import SignIn from "../components/signin";
import {Card, CardContent, Tab, Box, Typography, Stack} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import logo from "../logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice2";

export default function Auth() {
  const [value, setValue] = React.useState("1");
  const [show, setShow] = React.useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  //const navigate = useNavigate()

  const handlechangetab = (event, newValue) => {
    setValue(newValue);
    if (newValue == 2) {
      setShow(false);
    }
    if (newValue == 1) {
      setShow(true);
    }
  };
  useEffect(()=>{
    // if(auth.fetchstatus == 'success'){
    //   navigate('/main')
    // }
  })

  const handleloginuser = (data) =>{
    console.log('dispatch')
    console.log(data)
    dispatch(loginUser(data))
    //navigate('/main')
  }
  const handlelogoutuser = (data) =>{
    console.log('dispatch')
    console.log(data)
    dispatch(loginUser(data))
    //navigate('/')
  }

  return (
    <Card elevation={3} sx={{ minWidth: 275, borderRadius: "10px" }}>
      <CardContent>
        <Box sx={{ width: 500, maxWidth: "100%", height: 'auto' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack sx={{justifyContent: "center", alignItems: "center"}}>
                  <img className="logo" alt="logo" loading="lazy" src={logo} />
                  <Typography>
                    {show? 'Welcome back, enter your credential to sign in' : 'Create your account to join us'}
                  </Typography>
                </Stack>
              <TabList
                onChange={handlechangetab}
                centered={true}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Sign In" value="1" />
                <Tab label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <SignIn handlechangetab={handlechangetab} handleloginuser={handleloginuser}/>
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
