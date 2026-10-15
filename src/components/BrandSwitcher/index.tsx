import { useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

import { type Brand, brands } from '../../constants/brands';
import { usePreferences } from '../../state/preferences';
import styles from './index.module.less';

function BrandIcon({ brand }: { brand: Brand }) {
  const [failedLogo, setFailedLogo] = useState<string>();
  if (brand.logo && failedLogo !== brand.logo) {
    return (
      <img
        className={styles.logo}
        src={brand.logo}
        alt=""
        width={20}
        height={20}
        onError={() => setFailedLogo(brand.logo)}
      />
    );
  }
  return (
    <span className={styles.fallbackLogo} aria-hidden="true">
      {brand.name[0]}
    </span>
  );
}

export default function BrandSwitcher() {
  const { brand, switchBrand } = usePreferences();
  return (
    <Dropdown
      trigger={['click']}
      menu={{
        selectable: true,
        selectedKeys: [brand.id],
        style: { minWidth: 144 },
        items: brands.map((item) => ({
          key: item.id,
          label: (
            <span className={styles.menuItem}>
              <BrandIcon brand={item} />
              <span>{item.name}</span>
            </span>
          ),
        })),
        onClick: ({ key }) => switchBrand(key),
      }}
    >
      <button
        type="button"
        className={styles.button}
        aria-label={`切换品牌，当前品牌：${brand.name}`}
        title={brand.name}
      >
        <BrandIcon brand={brand} />
        <span className={styles.name}>{brand.name}</span>
        <DownOutlined className={styles.chevron} aria-hidden="true" />
      </button>
    </Dropdown>
  );
}
