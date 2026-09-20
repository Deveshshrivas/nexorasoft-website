import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

window.addEventListener('error', (e) => {
  document.body.innerHTML += '<div style="color:red;z-index:9999;position:fixed;top:100px;left:0;background:white;padding:20px;">' + e.error.message + '<br/>' + e.error.stack + '</div>';
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
