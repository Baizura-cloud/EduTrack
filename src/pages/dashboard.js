import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, CardHeader } from "@mui/material";
import Tasklist from "../components/taskList";
import ScheduleTimeline from "../components/scheduleTimeline";
import Bulletin from "../components/bulletinboard";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box sx={{ minWidth: 275, flexGrow: 1 }}>
        <Card variant="outlined" sx={{ padding: 2 }}>
          <CardHeader
            title="Dashboard"
            sx={{ textAlign: "start", margin: 2 }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Tasklist />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Bulletin />
              </Grid>
              {/* <Grid size={{ xs: 12, md: 4 }}>
                <ScheduleTimeline />
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  }
}
export default Dashboard;
