import { PageContainer } from '@ant-design/pro-components/layout';
import { Link, useLocation } from '@tanstack/react-router';
import { Button, Card, Empty, Result } from 'antd';

import { pageNames } from '../config/navigation';

export default function ModulePage() {
  const { pathname } = useLocation();
  const title = pageNames[pathname];
  if (!title) {
    return (
      <Result
        status={pathname === '/user/login' ? 'info' : '404'}
        title={pathname === '/user/login' ? '已退出登录' : '页面不存在'}
        subTitle={
          pathname === '/user/login' ? '当前项目已复刻系统首页布局，登录功能待接入。' : undefined
        }
        extra={
          <Link to="/welcome">
            <Button type="primary">返回首页</Button>
          </Link>
        }
      />
    );
  }
  return (
    <PageContainer title={title}>
      <Card>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="布局已就绪，可在此添加业务内容" />
        <div className="module-back">
          <Link to="/welcome">返回首页</Link>
        </div>
      </Card>
    </PageContainer>
  );
}
