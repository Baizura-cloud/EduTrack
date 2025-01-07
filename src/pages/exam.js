import React, { Component } from 'react'
import { connect } from 'react-redux'
import UnderConstruction from './underConstruction'
export class Exam extends Component {
  render() {
    return (
      <UnderConstruction/>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Exam)
