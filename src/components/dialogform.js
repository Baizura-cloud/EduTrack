import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Card } from "@mui/material";
import TaskForm from "./taskform";
import BulletinForm from "./bulletinform";
import Courseform from "./courseform";
import Classform from "./classform";
import Student from "./student";
import ExamForm from "./examform";
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
    const { activeItem, toggle, onSave, flag, studentList, activeClass } =
      this.props;
    return (
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
        <Card
          sx={{ minWidth: this.state.isSmallScreen ? 300 : 600, p: 1 }}
          role="presentation"
        >
          {flag === "task" ? (
            <TaskForm activeItem={activeItem} onSave={onSave} />
          ) : null}
          {flag === "bulletin" ? (
            <BulletinForm activeItem={activeItem} onSave={onSave} />
          ) : null}
          {flag === "course" ? (
            <Courseform activeItem={activeItem} onSave={onSave} />
          ) : null}
          {flag === "exam" ? (
            <ExamForm activeItem={activeItem} onSave={onSave} />
          ) : null}
          {flag === "class" ? (
            <Classform activeItem={activeItem} onSave={onSave} />
          ) : null}
          {flag === "student" ? (
            <Student activeClass={activeClass} studentList={studentList} />
          ) : null}
        </Card>
      </Dialog>
    );
  }
}

export default DialogForm;
