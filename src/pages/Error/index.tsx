import { Button, Result } from 'antd';

export default function ErrorPage() {
  return (
    <Result
      status="error"
      title="页面出现异常"
      subTitle="页面暂时无法显示，请重新加载后重试。"
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          重新加载
        </Button>
      }
    />
  );
}
