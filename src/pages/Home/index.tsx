import { type CSSProperties } from 'react';

import {
  ArrowRightOutlined,
  DashboardOutlined,
  FolderOpenOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Link } from '@tanstack/react-router';
import { Card, Tag, theme } from 'antd';

import styles from './index.module.less';

const modules = [
  {
    title: '文件管理',
    description: '集中管理文档、表格、图片与音视频文件。',
    path: '/files/list',
    icon: FolderOpenOutlined,
  },
  {
    title: '性能统计',
    description: '性能趋势、页面体验、请求耗时与异常记录的统一入口。',
    path: '/monitoring/overview',
    icon: DashboardOutlined,
  },
  {
    title: '用户账号',
    description: '用户账号、账号状态与组织信息的管理入口。',
    path: '/users/accounts',
    icon: TeamOutlined,
  },
  {
    title: '权限管理',
    description: '页面资源、用户角色与访问权限的管理入口。',
    path: '/admin/permissions',
    icon: SafetyCertificateOutlined,
  },
] as const;

const capabilities = [
  { title: '布局与主题', description: '混合导航、可折叠侧栏、主题颜色和布局设置。' },
  { title: '偏好设置', description: '布局与主题偏好自动保存在当前浏览器。' },
  { title: '路由与导航', description: '集中配置路由、菜单联动、面包屑和按需加载。' },
  { title: '加载与反馈', description: '页面加载状态、网络连接提示和异常页面。' },
] as const;

export default function HomePage() {
  const { token } = theme.useToken();
  const pageStyle = {
    '--home-primary': token.colorPrimary,
    '--home-primary-text': token.colorPrimaryText,
    '--home-primary-bg': token.colorPrimaryBg,
    '--home-surface': token.colorBgContainer,
    '--home-text': token.colorText,
    '--home-text-secondary': token.colorTextSecondary,
    '--home-border': token.colorBorderSecondary,
    '--home-fill': token.colorFillQuaternary,
  } as CSSProperties;
  return (
    <PageContainer breadcrumb={{ items: [] }} title="项目工作台">
      <div className={styles.page} style={pageStyle}>
        <Card className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.intro}>
              <span className={styles.eyebrow}>统一管理 · 按需扩展</span>
              <h1>AdminBase 后台管理框架</h1>
              <p>
                面向企业内部管理系统的前端基础模板，整合用户、权限、文件与性能统计入口，为业务页面提供统一的布局与交互体验。
              </p>
              <div className={styles.stack}>
                {['Vite 8', 'React 19', 'TypeScript', 'Ant Design 6', 'TanStack Router'].map(
                  (name) => (
                    <Tag key={name}>{name}</Tag>
                  ),
                )}
              </div>
            </div>
            <div className={styles.context}>
              <dl>
                <div>
                  <dt>运行环境</dt>
                  <dd>{import.meta.env.VITE_APP_ENV_NAME}</dd>
                </div>
              </dl>
              <p>通过顶部设置入口调整布局与主题。</p>
            </div>
          </div>
        </Card>
        <section aria-labelledby="home-modules-title">
          <div className={styles.sectionHeader}>
            <h2 id="home-modules-title">常用功能</h2>
            <span>从这里进入项目的主要模块</span>
          </div>
          <div className={styles.moduleGrid}>
            {modules.map(({ title, description, path, icon: Icon }) => (
              <Link key={path} to={path} className={styles.moduleLink}>
                <Card className={styles.moduleCard}>
                  <div className={styles.moduleTop}>
                    <span className={styles.moduleIcon}>
                      <Icon aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className={styles.moduleAction}>
                    进入模块 <ArrowRightOutlined aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <Card className={styles.detailCard}>
          <h2>框架基础能力</h2>
          <p className={styles.sectionDescription}>复用已有能力，专注业务功能的实现。</p>
          <div className={styles.capabilityGrid}>
            {capabilities.map(({ title, description }) => (
              <div className={styles.capability} key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
