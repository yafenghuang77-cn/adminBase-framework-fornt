import { type ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

export default function StandaloneLayout({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="standalone-page">
      <Link to="/welcome" className="workspace-link">
        返回首页
      </Link>
      {children}
    </main>
  );
}
