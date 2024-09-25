import * as React from "react";
import "../App.css";
import Signup from "../components/signup";
import SignIn from "../components/signin";
import { Card, CardContent, Tab, Box, Typography, Stack } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import logo from "../logo2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice2";
import Snack from "../components/snackbar";
import Loading from "../components/loading";

export default function Auth() {
  const [value, setValue] = useState("1");
  const [show, setShow] = useState(true);
  const [toggleSnack, settoggleSnack] = useState(false);
  const [loading, setloading] = useState(false);
  const [messageSnack, setmessageSnack] = useState("");
  const [severitySnack, setSeveritySnack] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlechangetab = (event, newValue) => {
    setValue(newValue);
    if (newValue == 2) {
      setShow(false);
    }
    if (newValue == 1) {
      setShow(true);
    }
  };

  const handleloginuser = (data) => {
    setloading(true);
    dispatch(loginUser(data));
    setTimeout(function () {
      const local = localStorage.getItem("persist:root"); //get local storage auth
      if (local !== null) {
        const jsonLocal = JSON.parse(local);  // local data as json
        if (jsonLocal) {
          const authr = JSON.parse(jsonLocal.auth); //get auth response
          if (authr.fetchstatus == "success") {
            navigate("/");
            setloading(false);
          } else {
            settoggleSnack(true);
            setmessageSnack("Invalid Credentials");
            setSeveritySnack("error");
            setloading(false);
          }
        } else {
          settoggleSnack(true);
          setmessageSnack("Invalid Credentials");
          setSeveritySnack("error");
          setloading(false);
        }
      }
    }, 2000);
  };
  return (
    <>
      {loading ? <Loading openload={loading} /> : null}
      <Card elevation={3} sx={{ minWidth: 275, borderRadius: "10px" }}>
        <CardContent>
          <Box sx={{ width: 500, maxWidth: "100%", height: "auto" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                  <img className="logo" alt="logo" loading="lazy" src={logo} />
                  <Typography>
                    {show
                      ? "Welcome back, enter your credential to sign in"
                      : "Create your account to join us"}
                  </Typography>
                </Stack>
                <TabList
                  onChange={handlechangetab}
                  centered={true}
                  TabIndicatorProps={{ sx: { backgroundColor: "#AF1763" } }}
                >
                  <Tab label="Sign In" value="1" />
                  <Tab label="Sign Up" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <SignIn
                  handlechangetab={handlechangetab}
                  handleloginuser={handleloginuser}
                />
              </TabPanel>
              <TabPanel value="2">
                <Signup handlechangetab={handlechangetab} />
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
        {toggleSnack ? (
          <Snack
            open={toggleSnack}
            message={messageSnack}
            severity={severitySnack}
          />
        ) : null}
      </Card>
    </>
  );
}
