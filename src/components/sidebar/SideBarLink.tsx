import type { PropsWithChildren } from 'react';
import styles from './SideBarLink.module.css';
import { Link } from '@navikt/ds-react';

export default function SideBarLink({
  children,
  to,
}: PropsWithChildren & { to: string }) {
  return (
    <Link
      className={({ isActive }) =>
        `${styles['sidebarlink']} ${isActive ? styles['active'] : ''}`
      }
      href={to}
    >
      <div className={styles['sidebarlink-child']}>{children}</div>
    </Link>
  );
}
