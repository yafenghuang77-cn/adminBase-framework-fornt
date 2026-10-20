import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Form, Input } from 'antd';

import { useSession } from '../../stores/preferences';

interface LoginValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const signIn = useSession((state) => state.signIn);
  return (
    <main className="login-page">
      <div className="login-panel">
        <div className="login-brand">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} width={36} height={36} alt="" />
          <span>AdminBase</span>
        </div>
        <Card>
          <span>欢迎回来</span>
          <h1>登录工作台</h1>
          <p>使用您的账号继续。</p>
          <Form<LoginValues>
            name="login"
            layout="vertical"
            requiredMark={false}
            onFinish={(values) => {
              signIn(values.username);
              void navigate({ to: '/welcome', replace: true });
            }}
          >
            <Form.Item
              name="username"
              label="账号"
              rules={[{ required: true, whitespace: true, message: '请输入账号' }]}
            >
              <Input autoComplete="username" prefix={<UserOutlined aria-hidden="true" />} />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                autoComplete="current-password"
                prefix={<LockOutlined aria-hidden="true" />}
              />
            </Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
          </Form>
        </Card>
      </div>
    </main>
  );
}
