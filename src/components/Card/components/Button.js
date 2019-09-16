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
      <a className="button__link" href={"https://www." + this.props.link}>
        <svg className="button__background" width="100" height="100">
          <circle cx="30"
            cy="30"
            r="35"
            fill="#333333">
          </circle>
        </svg>
        <img className="button__image" src={img(this.props.type)} alt={alt(this.props.type)} />
      </a>
    )
  }
}

export default Button
