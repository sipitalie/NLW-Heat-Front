import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import {App} from './App';
import {AuthProvider} from './contexts/Auth'
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
