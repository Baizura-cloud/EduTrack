import React, { Component } from "react";
import Calendar from "rsuite/Calendar";
import { Badge, List, HStack } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "rsuite/Calendar/styles/index.css";
import { Card, CardContent, CardHeader } from "@mui/material";
import Grid from "@mui/material/Grid2";
export class Calendarr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
    };
  }

  getTodoList = (date) => {
    if (!date) {
      return [];
    }
    const day = date.getDate();
    switch (day) {
      case 10:
        return [
          { time: "10:30 am", title: "Meeting" },
          { time: "12:00 pm", title: "Lunch" },
        ];
      case 15:
        return [
          { time: "09:30 pm", title: "Products Introduction Meeting" },
          { time: "12:30 pm", title: "Client entertaining" },
          { time: "02:00 pm", title: "Product design discussion" },
          { time: "05:00 pm", title: "Product test and acceptance" },
          { time: "06:30 pm", title: "Reporting" },
        ];
      default:
        return [];
    }
  };

  renderTodoList = (date) => {
    const list = this.getTodoList(date);

    if (!list.length) {
      return null;
    }

    return (
      <List style={{ flex: 1 }} bordered>
        {list.map((item) => (
          <List.Item key={item.time} index={item.time}>
            <div>{item.time}</div>
            <div>{item.title}</div>
          </List.Item>
        ))}
      </List>
    );
  };

  renderCell = (date) => {
    const list = this.getTodoList(date);
    if (list.length) {
      return <Badge className="calendar-todo-item-badge" />;
    }
    return null;
  };

  handleSelect = (date) => {
    this.setState({ selectedDate: date });
  };
  render() {
    return (
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardHeader
          title="Timetable"
          subheader="List of your classes timetable"
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
              <HStack
                spacing={10}
                style={{ height: 320 }}
                alignItems="flex-start"
                wrap
              >
                <Calendar
                  compact
                  renderCell={this.renderCell}
                  onSelect={this.handleSelect}
                  style={{ width: 320 }}
                />
                {this.renderTodoList(this.state.selectedDate)}
              </HStack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default Calendarr;
