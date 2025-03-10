import { Skeleton } from '@navikt/ds-react';
import styles from '../sidebar/Sidebar.module.css';

export default function SideBarSkeleton() {
  return (
    <div className={`${styles.closed} ${styles.sidebar}`} role="navigation">
      <div style={{ padding: '0.5rem' }}>
        <Skeleton
          variant="rectangle"
          width="2rem"
          height="2rem"
          style={
            {
              '--ac-skeleton-bg': 'rgba(255, 255, 255, 0.3)',
              '--ac-skeleton-shine': 'rgba(255, 255, 255, 0.6)',
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
