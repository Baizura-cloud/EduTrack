import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Tasklist from "./taskList";
import ScheduleTimeline from "./scheduleTimeline";

export default function DashboardPersonal() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Tasklist title={'Breakdown your daily task'} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <ScheduleTimeline/>
        </Grid>
      </Grid>
    </Box>
  );
}
