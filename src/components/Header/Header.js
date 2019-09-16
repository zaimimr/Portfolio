import React, { Component } from 'react'
import './Header.scss';


export class Header extends Component {

  render() {
    const size = this.props.size;
    return (
      <div className={`header-${size}`}>{this.props.title}</div>
    )
  }
}

export default Header
