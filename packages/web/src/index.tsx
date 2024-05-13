import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';

// Find the container element
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container); // Create a root
    root.render(<App />); // Use the root to render the App
} else {
    console.error('Failed to find the root element');
}
