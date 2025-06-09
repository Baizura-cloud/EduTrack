import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import UnderConstruction from './underConstruction'
import Courselist from '../components/courselist'
export class Course extends Component {
  render() {
    return (
      <Card variant="outlined" sx={{ padding: 2 }}>
        <CardHeader
          title={
            <div>
              Courses Hub
            </div>
          }
          sx={{ textAlign: "start", margin: 2 }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Courselist />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <UnderConstruction />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
