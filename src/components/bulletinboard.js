import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

class Bulletin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [
        { // dummy data
          id: 1,
          created_at: "2024-09-20 03:18:54.185187+00",
          title: "Urgent",
          details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fuscesuscipit accumsan lacus, in porta tortor facilisis vel. Donecmolestie risus ante, non semper mauris tincidunt nec. Vestibulum posuere congue lorem ut tempor. Sed interdum consectetur risus et molestie.",
          created_by: "badrulazura@gmail.com",
        },
      ],
    };
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
    //open modal
  };
  render() {
    return (
      <Box sx={{ minWidth: 275 }}>
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

export default Bulletin;
