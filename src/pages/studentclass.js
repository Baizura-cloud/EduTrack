import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, List, ListItem, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { fetchClassStudent } from "../redux/classSlice";
import { connect } from "react-redux";

class StudentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listStatus: false,
      activeList: [],
      classList: [],
      openList: false,
      activeClass: {},
    };
  }

  componentDidMount() {
    this.props.fetchClassStudent(this.props.auth.data.user.email)
    this.setState({classList:this.props.classstudent.data})
  }

  handleStudentlist = (clStudent) => {
    this.setState({ activeClass: clStudent, openList: true });
  };
  createClass = () => {
    console.log("open drawer form");
  };

  renderclassCard = () => {
    const classStudent = this.props.classstudent.data;
    return (
      <>
        {classStudent
          ? classStudent.map((clStudent) => (
              <Card key={clStudent.id} variant="outlined" sx={{ width: 200, height: 100 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 16 }}
                  >
                    {clStudent.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "end" }}>
                  <Button
                  variant="contained"
                    size="small"
                    onClick={() => this.handleStudentlist(clStudent)}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
            ))
          : null}
      </>
    );
  };

  renderstudentCard = () => {
    const student = this.state.activeClass.members.student;
    return (
      <>
        <Card variant="outlined" sx={{textAlign:'start'}}>
          <CardHeader
            title={"Student List"}
            action={
              <div align="right">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={this.addstudent}
                >
                  Add Student
                </Button>
              </div>
            }
          />
          <CardContent>
            {student
              ? student.map((stud) => {
                  return (
                    <ul key={stud.id}>
                      <li >{stud}</li>
                    </ul>
                  );
                })
              : null}
          </CardContent>
        </Card>
      </>
    );
  };

  render() {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" sx={{ padding: 2 }}>
          <CardHeader
            title="Class"
            sx={{ textAlign: "start", margin: 2 }}
            action={
              <div align="right">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={this.createClass}
                >
                  New class
                </Button>
              </div>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  useFlexGap
                  sx={{ flexWrap: "wrap" }}
                >
                  {this.renderclassCard()}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                {this.state.openList ? this.renderstudentCard() : null}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  classstudent: state.classstudent,
});

const mapDispatchToProps = (dispatch) => ({
  fetchClassStudent: (email) => dispatch(fetchClassStudent(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentClass);
