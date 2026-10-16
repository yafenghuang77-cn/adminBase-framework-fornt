import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Link } from '@tanstack/react-router';
import { Avatar, Card, Descriptions } from 'antd';
import { useIntl } from 'react-intl';

import { brands } from '../../config/brands';
import StandaloneLayout from '../../layouts/StandaloneLayout';
import { usePreferences, useSession } from '../../stores/preferences';

export default function AccountCenter() {
  const intl = useIntl();
  const userName = useSession((state) => state.userName);
  const brandId = usePreferences((state) => state.brandId);
  return (
    <StandaloneLayout>
      <PageContainer title={intl.formatMessage({ id: 'account.center' })}>
        <Card
          className="profile-card"
          extra={
            <Link to="/account/settings" className="workspace-link">
              {intl.formatMessage({ id: 'account.settings' })}
            </Link>
          }
        >
          <Avatar size={64} icon={<UserOutlined />} />
          <h1>{userName}</h1>
          <p>{intl.formatMessage({ id: 'profile.description' })}</p>
          <Descriptions
            column={1}
            items={[
              {
                key: 'name',
                label: intl.formatMessage({ id: 'profile.name' }),
                children: userName,
              },
              {
                key: 'brand',
                label: intl.formatMessage({ id: 'profile.brand' }),
                children: brands.find((item) => item.id === brandId)?.name,
              },
              {
                key: 'role',
                label: intl.formatMessage({ id: 'profile.role' }),
                children: intl.formatMessage({ id: 'profile.roleValue' }),
              },
            ]}
          />
        </Card>
      </PageContainer>
    </StandaloneLayout>
  );
}
