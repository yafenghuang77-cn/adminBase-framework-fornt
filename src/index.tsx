import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '@sentry/react';
import { Button, Result } from 'antd';

import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('应用初始化失败：未找到 #root 挂载节点。');
}

createRoot(container).render(
  <ErrorBoundary
    fallback={
      <Result
        role="alert"
        status="error"
        title="页面出现异常"
        subTitle="页面暂时无法显示，请刷新后重试。"
        extra={<Button onClick={() => window.location.reload()}>刷新页面</Button>}
      />
    }
  >
    <App />
  </ErrorBoundary>,
);
