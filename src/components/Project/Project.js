import React, { Component } from 'react'
import './Project.scss'
import Card from '../Card/Card'


export class Project extends Component {
  render() {
    return (
      <div className="project__wrapper">
        {this.props.data.map(card => (<Card className="card" tags={card.tags} title={card.title} text={card.text} web={card.web} github={card.github} />))}
      </div>
    )
  }
}

export default Project
