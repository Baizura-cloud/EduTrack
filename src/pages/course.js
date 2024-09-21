import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listStatus: false,
      activeList: [],
      courseList: [
        {
          //dummy data
          id: 1,
          name: "Science",
          classCount: 2,
          className: [
            {
              name: "13-A",
            },
            {
              name: "13-B",
            },
          ],
        },
        {
          //dummy data
          id: 2,
          name: "Physics",
          classCount: 3,
          className: [
            {
              name: "14-A",
            },
            {
              name: "14-B",
            },
            {
              name: "14-C",
            },
          ],
        },
      ],
    };
  }
  handleClass = () => {
    console.log("class ?");
  };
  rendercourseCard = () => {
    return (
      <>
        {this.state.courseList
          ? this.state.courseList.map((course) => (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 16 }}
                  >
                    {course.name}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {course.classCount} Class(es)
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={this.handleClass}>
                    Class
                  </Button>
                </CardActions>
              </Card>
            ))
          : null}
      </>
    );
  };
  render() {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" sx={{ padding: 2}}>
          <CardHeader title="Course" sx={{ textAlign: "start", margin: 2 }} />
          <CardContent>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap" }}
            >
              {this.rendercourseCard()}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default Course;
