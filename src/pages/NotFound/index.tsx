import { Link } from '@tanstack/react-router';
import { Result } from 'antd';

export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="请检查访问地址，或返回首页继续操作。"
      extra={
        <Link to="/welcome" className="workspace-link">
          返回首页
        </Link>
      }
    />
  );
}
