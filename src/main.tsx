import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from '@tanstack/react-router';

import { router } from '@/router';

// ProComponents 设置抽屉独立读取此配置，固定中文并覆盖旧的语言偏好。
localStorage.setItem('umi_locale', 'zh-CN');

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find root element');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
