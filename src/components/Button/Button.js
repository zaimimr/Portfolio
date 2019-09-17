import React, { Component } from 'react'
import './Button.scss'

export class Button extends Component {

  render() {
    return (
      <a target="_blank" rel="noopener noreferrer" href={this.props.link}>
        <div className="button__bc">
          <img className="button__image" src={this.props.img} alt="" />
        </div>
      </a>
    )
  }
}

export default Button
