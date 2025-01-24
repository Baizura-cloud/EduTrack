import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import * as XLSX from "xlsx";
import { CardActions, CardContent, Button } from "@mui/material";
export default class Studentfileupload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importdata: [], // excel file data
    };
  }
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
      <TableContainer>
        <Table stickyHeader sx={{ minWidth: 300 }} size="small">
          <TableHead>
            <TableRow sx={{ alignItems: "center" }}>
              <TableCell>Name</TableCell>
              <TableCell>Identification Card No. (IC)</TableCell>
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
                <TableCell>{row.KP}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : null;
  };

  handlesubmit = () => {
    const studentimport = this.state.importdata.map((data) => ({
      name: data.Nama,
      ic: data.KP
    }));
    this.props.onSave(studentimport)
  };
  render() {
    const { toggle } = this.props;
    return (
      <>
        <CardContent>
          {this.state.importdata.length == 0 ? (
            <div align="center">
              <Button
                variant="contained"
                startIcon={<FileUploadIcon />}
                component="label"
              >
                Upload Student List
                <input hidden type="file" onChange={this.handleFileUpload} />
              </Button>
            </div>
          ) : (
            this.renderimportdata()
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <Button variant="contained" color="error" onClick={toggle}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={this.handlesubmit}
          >
            Save
          </Button>
        </CardActions>
      </>
    );
  }
}
