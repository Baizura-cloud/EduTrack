import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Card, CardContent, CardHeader } from "@mui/material";

class ScheduleTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeList: [
        {
          // dummy data
          id: 1,
          time: "09:30 am",
          activity: "Science Class",
        },
        {
          id: 2,
          time: "10:30 am",
          activity: "Math Class",
        },
        {
          id: 3,
          time: "01:00 pm",
          activity: "Lunch",
        },
        {
          id: 4,
          time: "03:00 pm",
          activity: "event: Sports Day",
        },
      ],
    };
  }

  renderTime = () => {
    return (
      <>
        {this.state.timeList
          ? this.state.timeList.map((time) => (
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  {time.time}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{time.activity}</TimelineContent>
              </TimelineItem>
            ))
          : null}
      </>
    );
  };

  render() {
    return (
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardHeader title="Schedule" subheader="Breakdown your daily schedule" 
        sx={{ textAlign: "center" }} />
        <CardContent>
          <Timeline position="alternate">
            {this.renderTime()}
          </Timeline>
        </CardContent>
      </Card>
    );
  }
}

export default ScheduleTimeline;
