import { Link } from '@tanstack/react-router';
import { Result } from 'antd';
import { useIntl } from 'react-intl';

export default function NotFoundPage() {
  const intl = useIntl();
  return (
    <Result
      status="404"
      title="404"
      subTitle={intl.formatMessage({ id: 'notFound.description' })}
      extra={
        <Link to="/welcome" className="workspace-link">
          {intl.formatMessage({ id: 'action.back' })}
        </Link>
      }
    />
  );
}
