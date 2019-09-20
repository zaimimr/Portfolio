import React, { Component } from 'react'
import './Card.scss'
import Header from '../Header/Header'
import Tag from './components/Tags'
import Button from '../Button/Button';

import githubImg from '../../assets/img/github.svg'
import webImg from '../../assets/img/website.svg'




export class Tags extends Component {
  render() {
    const tags = this.props.tags;
    return (
      tags.map(tag => (<Tag key={tag.tag} tag={tag.tag} color={tag.color} />))
    )
  }
}
export class Buttons extends Component {
  render() {
    const github = this.props.github;
    const web = this.props.web;
    if(web != null && github != null){
      return (
        <div className="links__card">
          <Button img={githubImg} link={github} />
          <Button img={webImg} link={web} />
        </div>
      )
    } else if (web == null) {
      return (
        <div className="links__card">
          <Button img={githubImg} link={github} />
        </div>
      )
    }else if(github == null) {
      return (
        <div className="links__card">
          <Button img={webImg} link={web} />
        </div>
      )
    }
  }
}

export class card extends Component {
  render() {
    return (
      <div className="card__wrapper">
        <Header className="head" size="small" title={this.props.title} />
        <Buttons github={this.props.github} web={this.props.web}/>
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
