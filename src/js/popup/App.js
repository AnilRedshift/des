import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.onRegexChange = this.onChange.bind(this, 'regex');
    this.onReplacementChange = this.onChange.bind(this, 'replacement');
    this.state = {
      regex: '',
      replacement: '',
    };
    chrome.storage.local.get(['regex', 'replacement'], ({regex='', replacement=''}) => {
      this.setState((oldState) => {
        if (oldState.regex === oldState.replacement === '') {
          return {regex, replacement}
        } else {
          return oldState;
        }
      });
    });
  }

  componentDidUpdate() {
    chrome.storage.local.set(this.state);
  }

  onChange(name, e) {
    this.setState({[name]: e.target.value});
  }

  render() {
    return (
      <div>
        <h3>Regex to find</h3>
        <input type="text" value={this.state.regex} onChange={this.onRegexChange}></input>
        <h3>Replacement text</h3>
        <input type="text" value={this.state.replacement} onChange={this.onReplacementChange}></input>
      </div>
    );
  }
}

export default App;
