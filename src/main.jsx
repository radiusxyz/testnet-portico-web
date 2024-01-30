import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ContextProvider } from './contexts/PorticoCtx.jsx';

document.getElementById('root') &&
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ContextProvider>
        <App />
      </ContextProvider>
    </React.StrictMode>
  );
