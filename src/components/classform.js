import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import * as XLSX from "xlsx";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

class Classform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: false,
      error1: false,
      importdata: [],
      student: [
        {
          id: 1,
          name: "",
          ic: "",
          class: "",
        },
      ],
    };
  }
  componentDidMount() {}
  handleAddDeleteStudent = (operation, index) => {
    if (operation == "add") {
      this.setState((prevstate) => ({
        student: [
          ...prevstate.student,
          { id: this.state.student.length + 1, name: "", ic: "", class: "" },
        ],
      }));
    } else if (operation == "delete") {
      this.setState((prevstate) => {
        const updateState = prevstate.student.filter(
          (items) => items.id !== index
        );
        return { student: updateState };
      });
    }
  };
  handleChange = (e, index) => {
    let { name, value } = e.target;
    if (e.target.name == "name") {
      if (e.target.value == "") {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
    }

    if (e.target.name == "sname") {
      const updatedStudent = [...this.state.student];
      updatedStudent[index].name = e.target.value;
      this.setState({ student: updatedStudent });
    } else if (e.target.name == "ic") {
      const updatedStudent = [...this.state.student];
      updatedStudent[index].ic = e.target.value;
      this.setState({ student: updatedStudent });
    } else {
      const activeItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem });
    }
  };
  handleclassname = (classname) => {// add class name to each student object
    const studentItem = this.state.student;
    const newStudentItem = studentItem.map((obj) => {
      return {
        ...obj,
        class: classname,
      };
    });

    const item = newStudentItem.map((obj) => {// remove id from each student object
      const { id, ...data } = obj;
      return data;
    });
    return item;
  };
  handlesubmit = () => {
    const classItem = this.state.activeItem;
    const studentItem = this.handleclassname(classItem.name);
    this.props.onSave(classItem, studentItem);
  };
  handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      this.setState({ importdata: sheetData });
    };

    reader.readAsArrayBuffer(file);
  };

  renderimportdata = () => {
    return this.state.importdata ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small">
          <TableHead>
            <TableRow sx={{ alignItems: "start" }}>
              <TableCell>Name</TableCell>
              <TableCell>KP</TableCell>
              <TableCell>Class</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.importdata.map((row) => (
              <TableRow
                key={row.Bil}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Nama}
                </TableCell>
                <TableCell align="right">{row.KP}</TableCell>
                <TableCell align="right">{row.Kelas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : null;
  };

  render() {
    const { activeItem } = this.props;

    return (
      <Card>
        <CardHeader
          title={"Class"}
          action={
            <div align="right">
              <Button
                variant="contained"
                startIcon={<FileUploadIcon />}
                component="label"
              >
                Upload File
                <input hidden type="file" onChange={this.handleFileUpload} />
              </Button>
            </div>
          }
        />
        <CardContent>
          {this.state.importdata.length == 0 ? (
            <>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <InputLabel sx={{ padding: 2 }}>Class Name</InputLabel>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <FormControl error={this.state.error} fullWidth={true}>
                    <OutlinedInput
                      type="text"
                      id="class-name"
                      name="name"
                      defaultValue={activeItem.name}
                      onChange={this.handleChange}
                    />
                    <FormHelperText id="my-helper-text">
                      {this.state.error ? "Must not empty" : " "}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              {activeItem.name == "" ? (
                <>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Student
                        <IconButton
                          onClick={() => this.handleAddDeleteStudent("add")}
                        >
                          <AddCircleIcon color="primary" />
                        </IconButton>
                      </Typography>
                    </Grid>
                  </Grid>
                  {this.state.student.map((data, index) => {
                    return (
                      <>
                        <Grid container spacing={1}>
                          <Grid size={{ xs: 12, md: 3 }}>
                            <InputLabel sx={{ padding: 2 }}>Name</InputLabel>
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <FormControl
                              error={this.state.error}
                              fullWidth={true}
                            >
                              <OutlinedInput
                                type="text"
                                id="student-name"
                                name="sname"
                                onChange={(e) => this.handleChange(e, index)}
                              />
                              <FormHelperText id="my-helper-text">
                                {this.state.error ? "Must not empty" : " "}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid size={{ xs: 12, md: 3 }}>
                            <InputLabel sx={{ padding: 2 }}>IC No.</InputLabel>
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <FormControl
                              error={this.state.error}
                              fullWidth={true}
                            >
                              <OutlinedInput
                                type="text"
                                id="student-ic"
                                name="ic"
                                onChange={(e) => this.handleChange(e, index)}
                              />
                              <FormHelperText id="my-helper-text">
                                {this.state.error ? "Must not empty" : " "}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid size={{ xs: 12, md: 1 }}>
                            <IconButton
                              onClick={() =>
                                this.handleAddDeleteStudent("delete", index)
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                </>
              ) : null}
            </>
          ) : (
            <>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, md: 12 }}>{this.renderimportdata()}</Grid>
              </Grid>
            </>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <Button
            variant="contained"
            color="success"
            onClick={this.handlesubmit}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Classform;
