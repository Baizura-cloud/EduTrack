import React, { Component } from 'react'
import CardContent from "@mui/material/CardContent";
import error4 from "../404.png"

export default class ErrorPage extends Component {
  render() {
    return (
        <CardContent sx={{ maxWidth: 345, justifySelf: "center", alignSelf:'center'}}>
        <img src={error4} alt="Error" />
      </CardContent>
    )
  }
}
