import React, { Component } from 'react'
import './Button.scss'

export class Button extends Component {

  render() {
    let color = "blue"
    if(this.props.color != null){
      color = this.props.color
    }
    return (
      <a target="_blank" rel="noopener noreferrer" href={this.props.link}>
        <div className={"button__bc-"+color}>
          <img className="button__image" src={this.props.img} alt="" />
        </div>
      </a>
    )
  }
}

export default Button
