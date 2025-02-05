import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import TaskForm from "./taskform";
import BulletinForm from "./bulletinform";
import Courseform from "./courseform";
// import EventForm from "./eventform";
import Classform from "./classform";
import StudentForm from "./studentform";

class FormDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { activeItem, toggle, onSave, flag } = this.props;
    return (
      <Drawer
        anchor="right"
        open={true}
        onClose={toggle}
        ModalProps={{
          keepMounted: true,
        }}
        disableScrollLock
      >
        <Box sx={{ width: 600, p: 2 }} role="presentation">
          {/* Your form content here */}
          {flag == "task" ? (
            <TaskForm activeItem={activeItem} onSave={onSave} />
          ) : null}
          {flag == "bulletin" ? (
            <BulletinForm activeItem={activeItem} onSave={onSave} />
          ) : null}
          {flag == "course" ? (
            <Courseform activeItem={activeItem} onSave={onSave} />
          ) : null}
          {/* {flag == 'event'? <EventForm activeItem={activeItem} onSave={onSave} />:null} */}
          {flag == "class" ? (
            <Classform activeItem={activeItem} onSave={onSave} />
          ) : null}
          {flag == "student" ? (
            <StudentForm activeItem={activeItem} onSave={onSave} />
          ) : null}
        </Box>
      </Drawer>
    );
  }
}
export default FormDrawer;
