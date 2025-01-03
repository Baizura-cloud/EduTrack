import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import TaskForm from "./taskform";
import BulletinForm from "./bulletinform";
import Courseform from "./courseform";
import EventForm from "./eventform";
import Classform from "./classform";
import StudentForm from "./studentform";
class DialogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        >
          <DialogContent>
            {/* Your form content here */}
            <Box sx={{ width: 600, p: 2 }} role="presentation">
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
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default DialogForm;
