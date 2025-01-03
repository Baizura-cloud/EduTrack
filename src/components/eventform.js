// import React, { Component } from "react";
// import FormControl from "@mui/material/FormControl";
// import Button from "@mui/material/Button";
// import InputLabel from "@mui/material/InputLabel";
// import FormHelperText from "@mui/material/FormHelperText";
// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   OutlinedInput,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";

// export default class EventForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeItem: this.props.activeItem,
//       error: false,
//       error1: false,
//       error2: false,
//     };
//   }
//   componentDidMount() {}
//   handleChange = (e) => {
//     let { name, value } = e.target;

//     if (e.target.name == "name") {
//       if (e.target.value == "") {
//         this.setState({ error: true });
//       } else {
//         this.setState({ error: false });
//       }
//     } else if (e.target.name == "details") {
//       if (e.target.value == "") {
//         this.setState({ error1: true });
//       } else {
//         this.setState({ error1: false });
//       }
//     }
//     const activeItem = { ...this.state.activeItem, [name]: value };
//     this.setState({ activeItem });
//   };

//   handlesubmit = () => {
//     const item = this.state.activeItem;
//     if (item.name == '') {
//       this.setState({ error: true });
//       return;
//     }
//     if (item.details == '') {
//       this.setState({ error1: true });
//       return;
//     }
//     if(!item.date){
//       this.setState({error2: true})
//       return;
//     }

//     this.props.onSave(item);
//   };

//   render() {
//     const { activeItem } = this.props;

//     return (
//       <Card>
//         <CardHeader title={"Event"} />
//         <CardContent>
//           <Grid container spacing={1}>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <InputLabel sx={{ padding: 2 }}>Name</InputLabel>
//             </Grid>
//             <Grid size={{ xs: 12, md: 8 }}>
//               <FormControl error={this.state.error} fullWidth={true}>
//                 <OutlinedInput
//                   type="text"
//                   id="event-name"
//                   name="name"
//                   defaultValue={activeItem.name}
//                   onChange={this.handleChange}
//                 />
//                 <FormHelperText id="my-helper-text">
//                   {this.state.error ? "Must not empty" : " "}
//                 </FormHelperText>
//               </FormControl>
//             </Grid>
//           </Grid>

//           <Grid container spacing={1}>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <InputLabel sx={{ padding: 2 }}>Details</InputLabel>
//             </Grid>
//             <Grid size={{ xs: 12, md: 8 }}>
//               <FormControl error={this.state.error1} fullWidth={true}>
//                 <OutlinedInput
//                   multiline
//                   type="text"
//                   id="event-details"
//                   name="details"
//                   defaultValue={activeItem.details}
//                   onChange={this.handleChange}
//                 />
//                 <FormHelperText id="my-helper-text">
//                   {this.state.error1 ? "Must not empty" : " "}
//                 </FormHelperText>
//               </FormControl>
//             </Grid>
//           </Grid>

//           <Grid container spacing={1}>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <InputLabel sx={{ padding: 2 }}>Date</InputLabel>
//             </Grid>
//             <Grid size={{ xs: 12, md: 8 }}>
//               <FormControl error={this.state.error2} fullWidth={true}>
//                 <OutlinedInput
//                   type="date"
//                   id="event-date"
//                   name="date"
//                   defaultValue={activeItem.date}
//                   onChange={this.handleChange}
//                 />
//                 <FormHelperText id="my-helper-text">
//                   {this.state.error2 ? "Must not empty" : " "}
//                 </FormHelperText>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <CardActions sx={{ justifyContent: "end" }}>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={this.handlesubmit}
//           >
//             Save
//           </Button>
//         </CardActions>
//       </Card>
//     );
//   }
// }
