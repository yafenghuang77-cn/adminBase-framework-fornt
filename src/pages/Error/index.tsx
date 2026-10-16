import { Button, Result } from 'antd';

import { messages } from '../../locales';
import { usePreferences } from '../../stores/preferences';

export default function ErrorPage() {
  const locale = usePreferences((state) => state.locale);
  return (
    <Result
      status="error"
      title={messages[locale]['error.title']}
      subTitle={messages[locale]['error.description']}
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          {messages[locale]['action.retry']}
        </Button>
      }
    />
  );
}
