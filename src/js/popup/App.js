import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.onRegexChange = this.onChange.bind(this, 'regex');
    this.onReplacementChange = this.onChange.bind(this, 'replacement');
    this.onSave = this.onSave.bind(this);
    this.state = {
      regex: '',
      replacement: '',
    };
    chrome.storage.local.get(['regex', 'replacement'], ({regex='', replacement=''}) => {
      this.setState((oldState) => {
        if (oldState.regex === '' && oldState.replacement === '') {
          return {regex, replacement}
        } else {
          return oldState;
        }
      });
    });
  }

  onChange(name, e) {
    this.setState({[name]: e.target.value});
  }

  onSave() {
    this.setState((prevState) => {
      chrome.storage.local.set(prevState, () => {
        window.close();
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Regex to find</h3>
        <input type="text" value={this.state.regex} onChange={this.onRegexChange}></input>
        <h3>Replacement text</h3>
        <input type="text" value={this.state.replacement} onChange={this.onReplacementChange}></input>
        <button onClick={this.onSave}>Save</button>
      </div>
    );
  }
}

export default App;
