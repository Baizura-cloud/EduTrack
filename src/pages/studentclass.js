import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Navigate } from "react-router-dom";

class StudentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listStatus: false,
      activeList: [],
      classList: [
        {
          //dummy data
          id: 1,
          name: "Class 13-A",
          studentCount: 4,
          student: [
            {
              name: "Lana Micheal",
            },
            {
              name: "John Lee",
            },
            {
              name: "Skye Fye",
            },
            {
              name: "Tony Marlone",
            },
          ],
        },
        {
          //dummy data
          id: 2,
          name: "Class 13-B",
          studentCount: 4,
          student: [
            {
              name: "Charles Mick",
            },
            {
              name: "Nance Lynn",
            },
            {
              name: "Hans Lorve",
            },
            {
              name: "Kyle Fyn",
            },
          ],
        },
      ],
    };
  }
  handleStudentlist = (studentList) => {
    console.log("nav to student list page");
  };
  renderclassCard = () => {
    return (
      <>
        {this.state.classList
          ? this.state.classList.map((classStudent) => (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 16 }}
                  >
                    {classStudent.name}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {classStudent.studentCount} Student
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={this.handleStudentlist}>
                    Student List
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
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          {this.renderclassCard()}
        </Stack>
      </Box>
    );
  }
}

export default StudentClass;
