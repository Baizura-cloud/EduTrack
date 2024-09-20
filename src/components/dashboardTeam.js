import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Tasklist from "./taskList";
import Bulletin from "./bulletinboard";

export default function DashboardTeam() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Tasklist title={'Task assigned'} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Bulletin />
        </Grid>
      </Grid>
    </Box>
  );
}
