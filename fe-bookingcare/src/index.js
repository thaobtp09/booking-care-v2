import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Lấy root element từ index.html
const container = document.getElementById('root');

// Tạo root theo chuẩn React 18+
const root = createRoot(container);

// Render App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
