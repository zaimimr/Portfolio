import React, { Component } from 'react'
import './Tags.scss'

export class tags extends Component {
  render() {
    return (
      <div className={`tags__wrapper ${this.props.color}`}>
        {this.props.tag}
      </div>
    )
  }
}

export default tags
