import React, { Component } from 'react'
import './Header.scss';


export class Header extends Component {

  render() {
    return (
      <div className={`header ${this.props.size}`}>{this.props.title}</div>
    )
  }
}

export default Header
