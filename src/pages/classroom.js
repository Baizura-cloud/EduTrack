import React, { Component } from "react";
import Classes from "../components/classes";
import Calendar from "../components/calendar";
import { Card, CardHeader, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
export class classroom extends Component {
  render() {
    return (
      <Card variant="outlined" sx={{ padding: 2 }}>
        <CardHeader
          title={
            <div>
              Classroom
            </div>
          }
          sx={{ textAlign: "start", margin: 2 }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Classes />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Calendar />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default classroom;
