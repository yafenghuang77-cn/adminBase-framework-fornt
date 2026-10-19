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
import { useIntl } from 'react-intl';

import { brands } from '../../config/brands';
import { usePreferences } from '../../stores/preferences';
import styles from './index.module.less';

const modules = [
  {
    title: 'menu.files',
    description: 'home.filesDescription',
    path: '/files/list',
    icon: FolderOpenOutlined,
  },
  {
    title: 'menu.monitoring',
    description: 'home.monitoringDescription',
    path: '/monitoring/overview',
    icon: DashboardOutlined,
  },
  {
    title: 'menu.accounts',
    description: 'home.usersDescription',
    path: '/users/accounts',
    icon: TeamOutlined,
  },
  {
    title: 'menu.permissions',
    description: 'home.permissionsDescription',
    path: '/admin/permissions',
    icon: SafetyCertificateOutlined,
  },
] as const;

const capabilities = ['layout', 'brand', 'routing', 'feedback'] as const;

export default function HomePage() {
  const intl = useIntl();
  const t = (id: string) => intl.formatMessage({ id });
  const { token } = theme.useToken();
  const brandId = usePreferences((state) => state.brandId);
  const brand = brands.find((item) => item.id === brandId) ?? brands[0];
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
    <PageContainer breadcrumb={{ items: [] }} title={t('welcome.title')}>
      <div className={styles.page} style={pageStyle}>
        <Card className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.intro}>
              <span className={styles.eyebrow}>{t('home.eyebrow')}</span>
              <h1>{t('home.heading')}</h1>
              <p>{t('home.description')}</p>
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
                  <dt>{t('home.brand')}</dt>
                  <dd>{brand.name}</dd>
                </div>
                <div>
                  <dt>{t('home.environment')}</dt>
                  <dd>{import.meta.env.VITE_APP_ENV_NAME}</dd>
                </div>
              </dl>
              <p>{t('home.context')}</p>
            </div>
          </div>
        </Card>
        <section aria-labelledby="home-modules-title">
          <div className={styles.sectionHeader}>
            <h2 id="home-modules-title">{t('home.modules')}</h2>
            <span>{t('home.moduleHint')}</span>
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
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                  <span className={styles.moduleAction}>
                    {t('home.enter')} <ArrowRightOutlined aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <Card className={styles.detailCard}>
          <h2>{t('home.capabilities')}</h2>
          <p className={styles.sectionDescription}>{t('home.capabilitiesHint')}</p>
          <div className={styles.capabilityGrid}>
            {capabilities.map((key) => (
              <div className={styles.capability} key={key}>
                <h3>{t(`home.${key}Title`)}</h3>
                <p>{t(`home.${key}Description`)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
