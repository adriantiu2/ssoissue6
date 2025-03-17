import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18 introduced a new `react-dom/client` API
import App from './App';  // Import your App component

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root
root.render(
  <React.StrictMode>
    <App />  {/* Render App component */}
  </React.StrictMode>
);
