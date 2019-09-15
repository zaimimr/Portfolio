import React, { Component } from 'react'
import './About.scss'

export class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="block1">
          <div className="b">Full-stack Developer</div>
          <div className="w"> and currently on my</div>
        </div>
        <div className="block2">
          <div className="y"> Second</div>
          <div className="w"> year of my</div>
          <div className="b"> Bachelor in Computer Engineering</div>
        </div>
      </div>
    )
  }
}

export default About
