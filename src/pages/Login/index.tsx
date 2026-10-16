import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import { Alert, Button, Card, Form, Input } from 'antd';
import { useIntl } from 'react-intl';

import { useSession } from '../../stores/preferences';

interface LoginValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const intl = useIntl();
  const navigate = useNavigate();
  const signIn = useSession((state) => state.signIn);
  const t = (id: string) => intl.formatMessage({ id });
  return (
    <main className="login-page">
      <div className="login-panel">
        <div className="login-brand">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} width={36} height={36} alt="" />
          <span>AdminBase</span>
        </div>
        <Card>
          <span>{t('login.welcome')}</span>
          <h1>{t('login.title')}</h1>
          <p>{t('login.description')}</p>
          <Alert type="info" showIcon title={t('login.demo')} />
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
              label={t('login.account')}
              rules={[{ required: true, whitespace: true, message: t('login.accountRequired') }]}
            >
              <Input autoComplete="username" prefix={<UserOutlined aria-hidden="true" />} />
            </Form.Item>
            <Form.Item
              name="password"
              label={t('login.password')}
              rules={[{ required: true, message: t('login.passwordRequired') }]}
            >
              <Input.Password
                autoComplete="current-password"
                prefix={<LockOutlined aria-hidden="true" />}
              />
            </Form.Item>
            <Button block type="primary" htmlType="submit">
              {t('login.submit')}
            </Button>
          </Form>
        </Card>
      </div>
    </main>
  );
}
