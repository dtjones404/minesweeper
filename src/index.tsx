import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="container border-2 border-red-500 mx-auto">
      <App />
    </div>
  </React.StrictMode>
);
