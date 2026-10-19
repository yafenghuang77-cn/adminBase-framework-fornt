// 环境变量保留英文标识，终端日志使用中文名称。
export const environmentNames: Readonly<Record<string, string>> = {
  test: '测试环境',
  staging: '预发环境',
  production: '生产环境',
};
