import React, { Component } from 'react'
import './Button.scss'

import github from '../../../assets/img/github.svg'
import web from '../../../assets/img/website.svg'

function img(string) {
  if (string === 'github') {
    return (github);
  } else if (string === 'web') {
    return (web);
  }
  return ('');
}
function alt(string) {
  if (string === 'github') {
    return ("Link to github");
  } else if (string === 'web') {
    return ("Link to website");
  }
  return ('');
}


export class Button extends Component {

  render() {
    return (
      <a target="_blank" href={this.props.link}>
        <div className="button__bc">
          <img className="button__image" src={img(this.props.type)} alt={alt(this.props.type)} />
        </div>
      </a>
    )
  }
}

export default Button
