import React, { Component } from 'react';
import CreateBucket from './components/CreateBucket';
import ListBuckets from './components/ListBuckets';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor() {
    super();

    this.state = {
      buckets: [
        {
          name: 'Hug',
          description: 'do some Hugging!!!'
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          some randome textsss
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CreateBucket/>
        <ListBuckets parentBuckets={this.state.buckets} />
      </div>
    );
  }
}

export default App;
