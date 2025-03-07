import { HouseIcon, MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Link } from '@navikt/ds-react';
import styles from './SideBar.module.css';
import sidebarLinkStyles from './SideBarLink.module.css';
import { microfrontendConfigArray as allApps } from 'src/microfrontend';
import { hasAccessToAdGroup } from 'src/utils/common';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';

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

  const renderSideBarLink = ({
    children,
    to,
  }: PropsWithChildren & { to: string }) => {
    // Get current path to determine active state
    const isActive =
      typeof window !== 'undefined' && window.location.pathname === to;

    return (
      <Link
        className={`${sidebarLinkStyles['sidebarlink']} ${isActive ? sidebarLinkStyles['active'] : ''}`}
        href={to}
      >
        <div className={sidebarLinkStyles['sidebarlink-child']}>{children}</div>
      </Link>
    );
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
        {renderSideBarLink({
          to: page.route,
          children: page.title,
        })}
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
          {renderSideBarLink({
            to: '/',
            children: (
              <>
                <HouseIcon className={styles['icon-style']} title="Hus" />
                Hjem
              </>
            ),
          })}
        </li>
        {getMicrofrontendLinks()}
      </ul>
    </div>
  );
}
