import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from './context/AuthContext';

ReactDom.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);