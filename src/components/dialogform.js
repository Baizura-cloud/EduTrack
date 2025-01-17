import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Card } from "@mui/material";
import TaskForm from "./taskform";
import BulletinForm from "./bulletinform";
import Courseform from "./courseform";
import EventForm from "./eventform";
import Classform from "./classform";
import StudentForm from "./studentform";
class DialogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSmallScreen: window.matchMedia("(max-width: 600px)").matches,
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.mediaQuery = window.matchMedia("(max-width: 600px)");
    this.mediaQuery.addEventListener("change", this.handleResize);
  }
  handleResize(event) {
    this.setState({ isSmallScreen: event.matches }); // Update state when the screen size changes
  }
  render() {
    const { activeItem, toggle, onSave, flag } = this.props;
    return (
      <div>
        <Dialog
          open={true}
          maxWidth={"xl"}
          onClose={toggle}
          PaperProps={{
            component: "form",
          }}
          disableScrollLock
        >
            {/* Your form content here */}
            <Card sx={{  minWidth: this.state.isSmallScreen? 300 : 600, p: 1 }} role="presentation">
              {flag == "task" ? (
                <TaskForm activeItem={activeItem} onSave={onSave} />
              ) : null}
              {flag == "bulletin" ? (
                <BulletinForm activeItem={activeItem} onSave={onSave} />
              ) : null}
              {flag == "course" ? (
                <Courseform activeItem={activeItem} onSave={onSave} />
              ) : null}
              {flag == "event" ? (
                <EventForm activeItem={activeItem} onSave={onSave} />
              ) : null}
              {flag == "class" ? (
                <Classform activeItem={activeItem} onSave={onSave} />
              ) : null}
              {flag == "student" ? (
                <StudentForm activeItem={activeItem} onSave={onSave} />
              ) : null}
            </Card>
        </Dialog>
      </div>
    );
  }
}

export default DialogForm;
