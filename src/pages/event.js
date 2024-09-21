import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listStatus: false,
      activeList: [],
      eventList: [
        {
          //dummy data
          id: 1,
          name: "Sports Day",
          details:
            "Sed posuere mi enim, vitae fermentum odio aliquam hendrerit. Praesent malesuada, nulla a aliquet ullamcorper, elit urna varius arcu, id pellentesque mauris nunc vitae lacus. Mauris sit amet dolor at metus fringilla sodales. Ut eget porta lorem. Donec egestas est nec odio laoreet, at efficitur tortor vulputate. Aenean luctus risus et lacus rutrum dapibus. Aenean tempor risus vitae nisl pretium sollicitudin. Curabitur scelerisque porttitor augue, vitae pulvinar lorem vulputate in. Mauris nisi ex, hendrerit et ipsum sit amet, tincidunt gravida turpis.",
          date: "12/9/2024",
        },
        {
          //dummy data
          id: 2,
          name: "Annual Exam",
          details:
            "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed id purus sit amet purus interdum hendrerit nec nec ipsum. Sed ac vehicula neque. Donec tincidunt vehicula ligula nec vulputate. Sed bibendum maximus metus, vel vestibulum lectus eleifend nec. Curabitur sed dolor eget tortor auctor dignissim sed in sapien. Suspendisse pretium efficitur maximus. Pellentesque facilisis lacus ipsum, eu scelerisque dolor pulvinar vitae. Maecenas fringilla ultricies felis vitae sollicitudin.",
          date: "30/9/2024",
        },
      ],
    };
  }
  handleClass = () => {
    console.log("class ?");
  };
  rendereventCard = () => {
    return (
      <>
        {this.state.eventList
          ? this.state.eventList.map((event) => (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 16 }}
                  >
                    {event.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 12 }}
                  >
                    {event.date}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "justify",
                      color: "text.secondary",
                      mb: 1.5,
                    }}
                  >
                    {event.details}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small" onClick={this.handleClass}>
                    Class
                  </Button>
                </CardActions> */}
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
          <CardHeader title="Event" sx={{ textAlign: "start", margin: 2 }} />
          <CardContent>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap", textAlign: "start" }}
            >
              {this.rendereventCard()}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default Event;
