import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.scss';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <header className={classes.App_header}>
          <img src={logo} className={classes.App_logo} alt="logo" />
          <h1 className={classes.App_title}>Welcome to React (with css Modules)</h1>
        </header>
        <p className={classes.App_intro}>
          To get started, edit <code>src/App.js</code> and save to reload. 
        </p>
      </div>
    );
  }
}

export default App;
