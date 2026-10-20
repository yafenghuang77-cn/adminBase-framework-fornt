import { PageContainer } from '@ant-design/pro-components';
import { App, Button, Card, Form, Input } from 'antd';

import StandaloneLayout from '../../layouts/StandaloneLayout';
import { useSession } from '../../stores/preferences';

interface ProfileValues {
  userName: string;
}

export default function AccountSettings() {
  const { message } = App.useApp();
  const userName = useSession((state) => state.userName);
  const setUserName = useSession((state) => state.setUserName);
  return (
    <StandaloneLayout>
      <PageContainer title="个人设置">
        <Card className="profile-card">
          <p>显示名称更新后，会同步显示在顶部用户菜单中。</p>
          <Form<ProfileValues>
            layout="vertical"
            initialValues={{ userName }}
            onFinish={(values) => {
              setUserName(values.userName);
              void message.success('修改已保存');
            }}
          >
            <Form.Item
              name="userName"
              label="显示名称"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  max: 32,
                  message: '请输入显示名称',
                },
              ]}
            >
              <Input maxLength={32} autoComplete="nickname" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form>
        </Card>
      </PageContainer>
    </StandaloneLayout>
  );
}
