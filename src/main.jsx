import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Self-hosted fonts: only the weights the CSS uses
import '@fontsource/young-serif/400.css';
import '@fontsource/courier-prime/400.css';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/600.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/500.css';
import '@fontsource/work-sans/600.css';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
