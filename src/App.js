/**
 * App
 */
import React, { Component } from 'react';
import RootApp from './components/RootApp';
import 'element-theme-default';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* RootApp for calender module */}
        <RootApp/>
      </div>
    );
  }
}

export default App;
