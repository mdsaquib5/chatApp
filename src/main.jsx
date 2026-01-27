import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/font.css';
import './styles/layout.css';
import './styles/global.css';
import './styles/responsive.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)