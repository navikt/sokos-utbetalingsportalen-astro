import { HouseIcon, MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Link } from '@navikt/ds-react';
import styles from './Sidebar.module.css';
import { microfrontendConfigArray as allApps } from 'src/microfrontend';
import { hasAccessToAdGroup } from 'src/utils/common';
import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

type SideBarProps = {
  adGroups: string[];
};

export default function SideBar({ adGroups }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const event = new CustomEvent('sidebarStateChange', {
      detail: { isOpen },
    });
    document.dispatchEvent(event);
  }, [isOpen]);

  const authorizedApps = allApps.filter(
    (app) =>
      hasAccessToAdGroup(adGroups, app.adGroupDevelopment) ||
      hasAccessToAdGroup(adGroups, app.adGroupProduction),
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderSideBarLink = ({
    children,
    to,
  }: PropsWithChildren & { to: string }) => {
    const isActive =
      typeof window !== 'undefined' && window.location.pathname === to;

    return (
      <Link
        className={`${styles.sidebarLink} ${isActive ? styles.active : ''}`}
        href={to}
      >
        <div className={styles.sidebarLinkChild}>{children}</div>
      </Link>
    );
  };

  if (!isOpen) {
    return (
      <div className={`${styles.closed} ${styles.sidebar}`} role="navigation">
        <Button
          className={styles.buttonColor}
          onClick={handleToggle}
          variant="primary-neutral"
          icon={<MenuHamburgerIcon title="Hamburgermeny ikon" />}
        />
      </div>
    );
  }

  function getMicrofrontendLinks() {
    return authorizedApps.map((page) => (
      <li key={page.app} className={styles.sidebarLinks}>
        {renderSideBarLink({
          to: page.route,
          children: page.title,
        })}
      </li>
    ));
  }

  return (
    <div className={styles.sidebar} role="navigation">
      <div className={styles.closeButton}>
        <Button
          className={styles.buttonColor}
          onClick={handleToggle}
          icon={<XMarkIcon title="Kryss ikon" />}
          iconPosition="right"
          variant="primary-neutral"
        >
          Lukk
        </Button>
      </div>

      <ul className={styles.sidebarList}>
        <li className={styles.sidebarLinks}>
          {renderSideBarLink({
            to: '/',
            children: (
              <>
                <HouseIcon className={styles.iconStyle} title="Hus ikon" />
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
