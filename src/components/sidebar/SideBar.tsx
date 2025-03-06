import { HouseIcon, MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import styles from './SideBar.module.css';
import SideBarLink from './SideBarLink';
import { microfrontendConfigArray as allApps } from 'src/microfrontend';
import { hasAccessToAdGroup } from 'src/utils/common';
import { useState } from 'react';

type SideBarProps = {
  adGroups: string[];
};

export default function SideBar({ adGroups }: SideBarProps) {
  const authorizedApps = allApps.filter(
    (app) =>
      hasAccessToAdGroup(adGroups, app.adGroupDevelopment) ||
      hasAccessToAdGroup(adGroups, app.adGroupProduction),
  );

  const [showSideBar, setShowSideBar] = useState(false);

  const handleToggle = () => {
    setShowSideBar(!showSideBar);
  };

  if (!showSideBar) {
    return (
      <div className={`${styles.closed} ${styles.sidebar}`} role="navigation">
        <Button
          className={styles['button-color']}
          onClick={handleToggle}
          variant="primary-neutral"
          icon={<MenuHamburgerIcon title="Hamburgermeny ikon" />}
        />
      </div>
    );
  }

  function getMicrofrontendLinks() {
    return authorizedApps.map((page) => (
      <li key={page.app} className={styles['sidebar-links']}>
        <SideBarLink to={page.route} key={page.app}>
          {page.title}
        </SideBarLink>
      </li>
    ));
  }

  return (
    <div className={styles['sidebar']} role="navigation">
      <div className={styles['closebutton']}>
        <Button
          className={styles['button-color']}
          onClick={handleToggle}
          icon={<XMarkIcon title="Kryss" />}
          iconPosition="right"
          variant="primary-neutral"
        >
          Lukk
        </Button>
      </div>

      <ul className={styles['sidebar-list']}>
        <li className={styles['sidebar-links']}>
          <SideBarLink to={'/'}>
            <HouseIcon className={styles['icon-style']} title="Hus" />
            Hjem
          </SideBarLink>
        </li>
        {getMicrofrontendLinks()}
      </ul>
    </div>
  );
}
