import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.css';
import '../script.js';

// We are reverting to vanilla JS for the About section to ensure stability.
// React components can still be added here if needed for other sections.

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <div />
    </React.StrictMode>
  );
}
