import React from 'react';
import applicationData from '../../processed_data/results.js';
import ColorBar from './Colors/color_bar';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <h1>This is the App file</h1>
        <svg width="600" height="200" id="svg">
          <ColorBar width="400"/>
        </svg>
      </div>
    );
  }
}

export default App;
