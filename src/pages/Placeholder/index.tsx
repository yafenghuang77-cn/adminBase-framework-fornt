import { PageContainer } from '@ant-design/pro-components';
import { useMatches } from '@tanstack/react-router';
import { Card, Empty } from 'antd';
import { useIntl } from 'react-intl';

export default function PlaceholderPage() {
  const intl = useIntl();
  const metadata = useMatches({ select: (matches) => matches.at(-1)?.staticData });
  const title = metadata?.locale
    ? intl.formatMessage({ id: metadata.locale, defaultMessage: metadata.name })
    : (metadata?.name ?? intl.formatMessage({ id: 'app.title' }));
  return (
    <PageContainer title={title}>
      <Card title={title}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    </PageContainer>
  );
}
