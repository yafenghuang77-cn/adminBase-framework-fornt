import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Link } from '@tanstack/react-router';
import { Avatar, Card, Descriptions } from 'antd';

import StandaloneLayout from '../../layouts/StandaloneLayout';
import { useSession } from '../../stores/preferences';

export default function AccountCenter() {
  const userName = useSession((state) => state.userName);
  return (
    <StandaloneLayout>
      <PageContainer title="个人中心">
        <Card
          className="profile-card"
          extra={
            <Link to="/account/settings" className="workspace-link">
              个人设置
            </Link>
          }
        >
          <Avatar size={64} icon={<UserOutlined />} />
          <h1>{userName}</h1>
          <p>管理您的个人信息与工作台偏好。</p>
          <Descriptions
            column={1}
            items={[
              {
                key: 'name',
                label: '显示名称',
                children: userName,
              },
            ]}
          />
        </Card>
      </PageContainer>
    </StandaloneLayout>
  );
}
