import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import About from './components/About/About';

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
    </div>
  );
}

export default App;
