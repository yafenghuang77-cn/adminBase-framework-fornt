import { useEffect } from 'react';

import { PageContainer } from '@ant-design/pro-components';
import { App, Button, Card, Form, Input, Select } from 'antd';
import { useIntl } from 'react-intl';

import StandaloneLayout from '../../layouts/StandaloneLayout';
import { type Locale } from '../../locales';
import { usePreferences, useSession } from '../../stores/preferences';

interface ProfileValues {
  userName: string;
  locale: Locale;
}

export default function AccountSettings() {
  const intl = useIntl();
  const { message } = App.useApp();
  const locale = usePreferences((state) => state.locale);
  const setLocale = usePreferences((state) => state.setLocale);
  const userName = useSession((state) => state.userName);
  const setUserName = useSession((state) => state.setUserName);
  const [form] = Form.useForm<ProfileValues>();
  useEffect(() => {
    form.setFieldValue('locale', locale);
  }, [form, locale]);
  return (
    <StandaloneLayout>
      <PageContainer title={intl.formatMessage({ id: 'account.settings' })}>
        <Card className="profile-card">
          <p>{intl.formatMessage({ id: 'profile.settingsHint' })}</p>
          <Form<ProfileValues>
            form={form}
            layout="vertical"
            initialValues={{ userName, locale }}
            onFinish={(values) => {
              setUserName(values.userName);
              setLocale(values.locale);
              void message.success(intl.formatMessage({ id: 'action.saved' }));
            }}
          >
            <Form.Item
              name="userName"
              label={intl.formatMessage({ id: 'profile.name' })}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  max: 32,
                  message: intl.formatMessage({ id: 'profile.nameRequired' }),
                },
              ]}
            >
              <Input maxLength={32} autoComplete="nickname" />
            </Form.Item>
            <Form.Item name="locale" label={intl.formatMessage({ id: 'profile.locale' })}>
              <Select
                options={[
                  { value: 'zh-CN', label: '简体中文' },
                  { value: 'en-US', label: 'English' },
                ]}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ id: 'action.save' })}
            </Button>
          </Form>
        </Card>
      </PageContainer>
    </StandaloneLayout>
  );
}
