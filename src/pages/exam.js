import React, { Component } from "react";
import { connect } from "react-redux";
import UnderConstruction from "./underConstruction";
import Examlist from "../components/examlist";
import { Card, CardContent, CardHeader, Grid2 } from "@mui/material";
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
          <Grid2 container spacing={2}>
            <Grid2 size={{xs:12,md:4}}>
              <Examlist />
            </Grid2>
            <Grid2 size={{xs:12,md:8}}>
              <UnderConstruction />
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
