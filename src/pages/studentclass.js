import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";
import { fetchClassStudent } from "../redux/classSlice";
import { connect } from "react-redux";

class StudentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listStatus: false,
      activeList: [],
      classList: [],
    };
  }

  componentDidMount (){
    this.props.fetchClassStudent(this.props.auth.data.user.email)
    this.setState({classList:this.props.classstudent.data})
  }

  handleStudentlist = (studentList) => {
    console.log("nav to student list page");
  };
  renderclassCard = () => {
    const classStudent = this.props.classstudent.data
    return (
      <>
        {classStudent
          ? classStudent.map((clStudent) => (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 16 }}
                  >
                    {clStudent.name}
                  </Typography>
                    {clStudent.members.student.map((student)=>(
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        {student}
                        </Typography>
                    ))}
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
        <Card variant="outlined" sx={{ padding: 2 }}>
          <CardHeader title="Class" sx={{ textAlign: "start", margin: 2 }} />
          <CardContent>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap" }}
            >
              {this.renderclassCard()}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

const mapStateToProps = (state) =>({
  auth:state.auth,
  classstudent:state.classstudent
})

const mapDispatchToProps = (dispatch) =>({
  fetchClassStudent: (email) => dispatch(fetchClassStudent(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentClass)
