import React from 'react';
import ReactDOM from 'react-dom';
import './lib/monkey_patches';

import App from './components/app';
import './styles/css/main.css';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  ReactDOM.render(<App />, rootEl);
})
