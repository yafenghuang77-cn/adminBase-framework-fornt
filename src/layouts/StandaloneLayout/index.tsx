import { type ReactNode } from 'react';

import { Link } from '@tanstack/react-router';
import { useIntl } from 'react-intl';

export default function StandaloneLayout({ children }: { children: ReactNode }) {
  const intl = useIntl();
  return (
    <main id="main-content" className="standalone-page">
      <Link to="/welcome" className="workspace-link">
        {intl.formatMessage({ id: 'action.back' })}
      </Link>
      {children}
    </main>
  );
}
