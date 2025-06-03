import React, { Component } from 'react'
import CardContent from "@mui/material/CardContent";
import uconstruct from "../assets/2.png"

export default class UnderConstruction extends Component {
  render() {
    return (
        <CardContent sx={{ maxWidth: 345, justifySelf: "center", alignSelf:'center'}}>
        <img src={uconstruct} alt="Under Construction" />
      </CardContent>
    )
  }
}
