import React, { Component } from 'react'
import './Project.scss'
import Header from '../Header/Header'
import Tag from './components/tags'



export class Tags extends Component {
  render() {
    const tags = this.props.tags;
    return (
      tags.map(tag => (<Tag key={tag.tag} tag={tag.tag} color={tag.color} />))
    )
  }
}

export class Project extends Component {
  render() {
    return (
      <div className="project__wrapper">
        <Header className="head" size="small" title={this.props.title} />
        <div className="desc">
          {this.props.text}
        </div>
        <div className="tags">
          <Tags tags={this.props.tags} />
        </div>
      </div>
    )
  }
}

export default Project
