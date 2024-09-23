import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import TaskForm from "./taskform";

class FormDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {activeItem, toggle,  onSave, flag } = this.props;
    return (
      <div>
        <Drawer
          anchor="right"
          open={true}
          onClose={toggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box sx={{ width: 600, p: 2 }} role="presentation">
            {/* Your form content here */}
            {flag == 'task'? <TaskForm activeItem={activeItem} onSave={onSave}  />: null}
          </Box>
        </Drawer>
      </div>
    );
  }
}
export default FormDrawer;
