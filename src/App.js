import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import About from './components/About/About';
import Project from './components/Project/Project';

const alleTags = [
  {
    tag: "Typescript",
    color: "yellow",
  },
  {
    tag: "SASS",
    color: "yellow"
  },
  {
    tag: "Vue.js",
    color: "blue"
  }
]

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
            <Project tags={alleTags} title="Project 1" text="Her skal det komme masse masse tekst"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
