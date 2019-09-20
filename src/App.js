import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import About from './components/About/About';
import Project from './components/Project/Project';

const data = require('./projects.json');

function App() {
  return (
    <div className="wrapper">
      <Header title="Zaim Imran" size="big" />
      <svg className="svg__name">
        <line x1="0" y1="0" x2="2000" y2="0" className="line" />
      </svg>
      <div className="description">
        <About />
        <svg className="svg__line">
          <line x1="0" y1="0" x2="0" y2="10000" className="line" />
        </svg>
      </div>
      <div className="projects">
        <div className="projects__header">
          <Header title="Projects" size="medium" />
          <svg className="svg__project-horizontal">
            <line x1="0" y1="0" x2="2000" y2="0" className="line" />
          </svg>
          <svg className="svg__project-vertical">
            <line x1="0" y1="0" x2="0" y2="10000" className="line" />
          </svg>
        </div>
        <div className="project__list">
          <svg className="svg__line__auto">
            <line x1="0" y1="0" x2="0" y2="10000" className="line" />
          </svg>
          <div>
            <Project data={data} />
          </div>
        </div>
      </div>
      <svg className="svg__end">
        <line x1="0" y1="0" x2="4000" y2="0" className="line" />
      </svg>
      <p className="footer">Laget av Zaim Imran™</p>
    </div>
  );
}

export default App;
