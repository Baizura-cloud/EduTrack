import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Tasklist from "./taskList";
import Bulletin from "./bulletinboard";
import { Typography } from "@mui/material";

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Tasklist />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography>Bulletin Board</Typography>
          <Bulletin />
        </Grid>
      </Grid>
    </Box>
  );
}
