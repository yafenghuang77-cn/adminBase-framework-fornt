import { PageContainer } from '@ant-design/pro-components';
import { useMatches } from '@tanstack/react-router';
import { Card, Empty } from 'antd';

export default function PlaceholderPage() {
  const metadata = useMatches({ select: (matches) => matches.at(-1)?.staticData });
  const title = metadata?.name ?? 'AdminBase 管理系统';
  return (
    <PageContainer title={title}>
      <Card title={title}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    </PageContainer>
  );
}
