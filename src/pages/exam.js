import React, { Component } from "react";
import { connect } from "react-redux";
import UnderConstruction from "./underConstruction";
import Examlist from "../components/examlist";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
export class Exam extends Component {
  render() {
    return (
      <Card variant="outlined" sx={{ padding: 2 }}>
        <CardHeader
        title={
          <div>
            Examination
          </div>
        }
        sx={{textAlign: "start", margin:2}}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{xs:12,md:4}}>
              <Examlist />
            </Grid>
            <Grid size={{xs:12,md:8}}>
              <UnderConstruction />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
