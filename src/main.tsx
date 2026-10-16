import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from '@tanstack/react-router';

import { router } from './router';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find root element');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
