import React, { Component } from 'react'
import './Card.scss'
import Header from '../Header/Header'
import Tag from './components/Tags'
import Button from './components/Button';



export class Tags extends Component {
  render() {
    const tags = this.props.tags;
    return (
      tags.map(tag => (<Tag key={tag.tag} tag={tag.tag} color={tag.color} />))
    )
  }
}

export class card extends Component {
  render() {
    return (
      <div className="card__wrapper">
        <Header className="head" size="small" title={this.props.title} />
        <div className="links">
          <Button type="github" link={this.props.github} />
          {/* <Button className="web" type="web" link={this.props.web} /> */}
        </div>
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

export default card
