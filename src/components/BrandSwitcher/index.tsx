import { useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useIntl } from 'react-intl';

import { type Brand, brands } from '../../config/brands';
import { usePreferences } from '../../stores/preferences';
import styles from './index.module.less';

function BrandIcon({ brand }: { brand: Brand }) {
  const [failedLogo, setFailedLogo] = useState<string>();
  return brand.logo && failedLogo !== brand.logo ? (
    <img
      className={styles.logo}
      src={brand.logo}
      alt=""
      width={20}
      height={20}
      onError={() => setFailedLogo(brand.logo)}
    />
  ) : (
    <span className={styles.fallbackLogo} aria-hidden="true">
      {brand.name[0]}
    </span>
  );
}

export default function BrandSwitcher() {
  const intl = useIntl();
  const brandId = usePreferences((state) => state.brandId);
  const setBrand = usePreferences((state) => state.setBrand);
  const brand = brands.find((item) => item.id === brandId) ?? brands[0];
  return (
    <Dropdown
      trigger={['click']}
      menu={{
        selectable: true,
        selectedKeys: [brand.id],
        style: { minWidth: 160 },
        items: brands.map((item) => ({
          key: item.id,
          label: (
            <span className={styles.menuItem}>
              <BrandIcon brand={item} />
              <span>{item.name}</span>
            </span>
          ),
        })),
        onClick: ({ key }) => setBrand(key),
      }}
    >
      <button
        type="button"
        className={styles.button}
        aria-label={intl.formatMessage({ id: 'action.brand' }, { name: brand.name })}
        title={brand.name}
      >
        <BrandIcon brand={brand} />
        <span className={styles.name}>{brand.name}</span>
        <DownOutlined className={styles.chevron} aria-hidden="true" />
      </button>
    </Dropdown>
  );
}
