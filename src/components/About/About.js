import React, { Component } from 'react'
import './About.scss'
import Button from '../Button/Button'

import github from '../../assets/img/github.svg'
import linkedin from '../../assets/img/linkedin1.svg'
import mail from '../../assets/img/mail.svg'
import cvimg from '../../assets/img/resume.svg'
import cv from '../../Zaim_Imran_CV_2019.pdf'

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
        <div className="links">
          <Button img={github} link="https://github.com/Zenjjim" />
          <Button img={linkedin} link="https://www.linkedin.com/in/zaim/" />
          <Button img={mail} link="mailto:zaim.imran@gmail.com" />
          <Button img={cvimg} link={cv} />
        </div>
      </div>
    )
  }
}

export default About
