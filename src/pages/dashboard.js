import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DashboardPersonal from "../components/dashboarPersonal";
import DashboardTeam from "../components/dashboardTeam";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container >
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider",}} >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
           TabIndicatorProps={{sx:{backgroundColor:"#AF1763", }}}
          >
            <Tab  label="Dashboard Personal" {...a11yProps(0)}  />
            <Tab label="Dashboard Team" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <DashboardPersonal/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DashboardTeam/>
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
