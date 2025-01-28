import React, { Component } from "react";
import { Card, CardContent, CardHeader, Grid2, IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
export class Examlist extends Component {
  handlecreateexam = () => {
    console.log("add")
  };
  rendertable = () =>{

    return (
        <TableContainer>
          <Table sx={{ minWidth: 300 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Class</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {classStudent.map((clStudent) => (
                <TableRow
                  key={clStudent.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {clStudent.name}
                  </TableCell>
                  <TableCell align="left">{clStudent.year}</TableCell>
                  <TableCell align="left">
                    {clStudent.created_by == this.props.auth.data.user.email ? (
                      <Stack direction="row" spacing={1}>
                        <Tooltip title={"Student List"} arrow>
                          <IconButton
                            sx={{ padding: 0 }}
                            color="primary"
                            onClick={() => this.handleStudentlist(clStudent)}
                          >
                            <PeopleIcon fontSize="medium" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"edit"} arrow>
                          <IconButton
                            sx={{ padding: 0 }}
                            color="secondary"
                            onClick={() => this.handleeditClass(clStudent)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"delete"} arrow>
                          <IconButton
                            sx={{ padding: 0 }}
                            color="error"
                            onClick={() => this.handleDelete(clStudent)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    ) : (
                      <Stack direction="row">
                        <Tooltip title={"Student List"} arrow>
                          <IconButton
                            sx={{ padding: 0 }}
                            color="primary"
                            onClick={() => this.handleStudentlist(clStudent)}
                          >
                            <PeopleIcon fontSize="medium" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"Author: " + clStudent.created_by} arrow>
                          <IconButton
                            color="secondary"
                            sx={{ padding: 0, marginLeft: 1 }}
                          >
                            <AttributionIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      );
  }
  render() {
    return (
      <>
        <Card variant="outlined" sx={{ minWidth: 275 }}>
          <CardHeader
            title="Exam"
            subheader="List of exam"
            action={
              <div align="right">
                <IconButton color="primary" onClick={this.handlecreateexam}>
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </div>
            }
          />
          <CardContent>
            <Grid2 container spacing={2}>
                <Grid2 size={{xs:12,md:12}}>{this.rendertable()}</Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default Examlist;
