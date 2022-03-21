import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataContextProvider } from './context/DataCon.jsx';
import TimeAgo from 'javascript-time-ago';
const en = require('javascript-time-ago/locale/en-IN.json');

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
    <App />
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
