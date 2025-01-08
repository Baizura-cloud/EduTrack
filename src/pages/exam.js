import React, { Component } from 'react'
import { connect } from 'react-redux'
import UnderConstruction from './underConstruction'
import ErrorPage from './404'
export class Exam extends Component {
  render() {
    return (
      <UnderConstruction/>
      // <ErrorPage/>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Exam)
