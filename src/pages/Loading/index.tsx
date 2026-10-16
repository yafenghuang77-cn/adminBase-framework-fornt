import { Card, Skeleton } from 'antd';

export default function LoadingPage() {
  return (
    <Card aria-busy="true">
      <Skeleton active paragraph={{ rows: 6 }} />
    </Card>
  );
}
