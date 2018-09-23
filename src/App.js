import React, { Component } from 'react';
import './App.css';
import Welcome from './Welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navBar">
          <a href="google.com" className="navLinks">home</a>
          <a href="google.com" className="navLinks">search</a>
          <a href="google.com" className="navLinks">about</a>
          <a href="google.com" className="navLinks last">logout</a>

        </nav>
        <Welcome />
      </div>
    );
  }
}

export default App;
