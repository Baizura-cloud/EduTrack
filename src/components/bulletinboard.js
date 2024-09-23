import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import FormDrawer from "./formdrawer";
import { fetchBulletin } from "../redux/bulletinSlice";
import { connect } from "react-redux";

class Bulletin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      toggleDrawer: false,
    };
  }

  componentDidMount(){
    this.props.fetchBulletin()
    this.setState({postList: this.props.bulletin.data})
  }

  renderCard = () => {
    return (
      <Card>
        {this.state.postList
          ? this.state.postList.map((post) => (
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ textAlign: "start", fontSize: 16 }}
                >
                  {post.title}
                </Typography>
                <Typography sx={{ textAlign: "justify", fontSize: 14 }}>
                  {post.details}
                  <br />
                </Typography>
              </CardContent>
            ))
          : null}
      </Card>
    );
  };
  createpost = () => {
    this.setState({toggleDrawer: !this.state.toggleDrawer}) //open drawer
  };
  toggle = () => {
    this.setState({ toggleDrawer: !this.state.toggleDrawer }); //function to be use to close drawer
  };
  render() {
    return (
      <Box sx={{ minWidth: 275 }}>
        {this.state.toggleDrawer? <FormDrawer toggle={this.toggle} />:null}
        <Card variant="outlined">
          <CardHeader
            title="Bulletin Board"
            subheader="Your daily announcement"
            action={
              <div align="right">
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={this.createpost}
                >
                  New post
                </Button>
              </div>
            }
          />
          <CardContent>{this.renderCard()}</CardContent>
        </Card>
      </Box>
    );
  }
}


const mapStateToProps = (state) =>({
  bulletin: state.bulletin
})
const mapDispatchToProps= (dispatch) =>({
  fetchBulletin: () => dispatch(fetchBulletin())
})

export default connect(mapStateToProps, mapDispatchToProps)(Bulletin)